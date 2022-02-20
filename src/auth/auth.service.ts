import { Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { newUserDTO, userLoginDTO } from 'src/users/dto/userAuth';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { MyResponse } from 'src/shared_dto/response';
import { UserRolesService } from 'src/user-roles/user-roles.service';
import { Tokens } from './interfaces/tokens';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private userRolesService: UserRolesService,
    private jwtService: JwtService,
  ) {}

  private async generateTokens(email: string, role: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          email,
          role,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: 60 * 30, // 30 minutes
        },
      ),
      this.jwtService.signAsync(
        {
          email,
          role,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: 60 * 60 * 24 * 2, // 2 days
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async loginUser(
    data: userLoginDTO,
    @Res() response: Response,
  ): Promise<MyResponse> {
    const user = await this.userService.findOneByEmail(data.email);
    if (!user)
      return {
        status: 400,
        message: 'Wrong password and/or email, Try again!',
      }; // user not found

    const passwordMatches = await bcrypt.compare(data.password, user.password);
    if (!passwordMatches)
      return {
        status: 400,
        message: 'Wrong password and/or email, Try again!',
      }; // bad password

    const { accessToken, refreshToken } = await this.generateTokens(
      user.email,
      user.userRole.role,
    );

    response.cookie('access_token', accessToken, {
      httpOnly: true,
    });
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
    });

    return {
      status: 200,
      message: 'Logged in successfully',
      data: {
        user: {
          email: user.email,
          role: user.userRole.role,
        },
      },
    }; // Logged in successfully
  }

  logoutUser(@Res() response: Response): MyResponse {
    response
      .clearCookie('access_token', {
        httpOnly: true,
      })
      .clearCookie('refresh_token', {
        httpOnly: true,
      });
    // TODO check how to change status
    // .json({ status: 200, message: 'Logged out successfully' });
    // .status(204);
    return { status: 200, message: 'Logged out successfully' };
  }

  async refreshToken(
    @Res({ passthrough: true }) response: Response,
    email: string,
    role: string,
  ): Promise<MyResponse> {
    const { accessToken, refreshToken } = await this.generateTokens(
      email,
      role,
    );

    console.log(`response: ${response}`);
    response.cookie('access_token', accessToken, {
      httpOnly: true,
    });
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
    });

    return { status: 200, message: 'Tokens refreshed' };
  }

  async registerNewUser(data: newUserDTO): Promise<MyResponse> {
    const saltOrRounds = parseInt(process.env.SALT_OF_ROUNDS);
    const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);

    const role = await this.userRolesService.findRoleByName(data.role);
    if (!role) return { status: 400, message: 'Role not exist' }; // unknown role name

    const emailAlreadyInDatabase = await User.findOne({ email: data.email });
    if (emailAlreadyInDatabase)
      return {
        status: 400,
        message: `User with email {${data.email}} already exist`,
      }; // user with this email already exists

    const newUser = new User(
      data.name,
      data.surname,
      data.email,
      hashedPassword,
      role,
    );

    const result = await User.save(newUser);
    if (!result) return { status: 400, message: 'Failed to add new user' }; // failed to add new user

    return { status: 201, message: 'Success, user account created' };
  }
}
