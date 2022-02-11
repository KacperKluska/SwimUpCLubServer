import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { newUserDTO, userLoginDTO } from 'src/users/dto/userAuth';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'src/shared_dto/response';
import { UserRolesService } from 'src/user-roles/user-roles.service';
import { Tokens } from './interfaces/tokens';

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
          secret: process.env.JWT_ACCESS_TOKEN,
          expiresIn: 60,
        },
      ),
      this.jwtService.signAsync(
        {
          email,
          role,
        },
        {
          secret: process.env.JWT_REFRESH_TOKEN,
          expiresIn: 60 * 10,
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async loginUser(data: userLoginDTO): Promise<Response | User | any> {
    const user = await this.userService.findOneByEmail(data.email);
    console.log(user);
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

    console.log(user);
    const role = await this.userRolesService.findRoleByName('USER');
    console.log(role);
    const tokens = await this.generateTokens(user.email, user.name);

    return { user, tokens };
    // return user;
  }

  logoutUser() {
    return null;
  }

  refreshToken() {
    return null;
  }

  async registerNewUser(data: newUserDTO): Promise<Response> {
    const saltOrRounds = parseInt(process.env.SALT_OF_ROUNDS);
    const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);

    const role = await this.userRolesService.findRoleByName(data.role);
    if (!role) return { status: 400, message: 'Role not exist' }; // nie znaleziono takiej roli

    const emailAlreadyInDatabase = await User.findOne({ email: data.email });
    if (emailAlreadyInDatabase)
      return {
        status: 400,
        message: `User with email {${data.email}} already exist`,
      }; // jest już user z tym mailem

    const newUser = new User(
      data.name,
      data.surname,
      data.email,
      hashedPassword,
      role,
    );

    const result = await User.save(newUser);
    if (!result) return { status: 400, message: 'Failed to add new user' }; // nie udało się dodać do bazy nowego usera

    return { status: 201, message: 'Success' };
  }
}
