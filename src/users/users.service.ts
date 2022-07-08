import { Injectable } from '@nestjs/common';
import { Gender } from 'src/entities/gender.entity';
import { UserRole } from 'src/entities/user-role.entity';
import { User } from 'src/entities/user.entity';
import { GendersService } from 'src/genders/genders.service';
import { MyResponse } from 'src/shared_dto/response';
import { UserDetailsService } from 'src/user-details/user-details.service';
import { UserRolesService } from 'src/user-roles/user-roles.service';
import { UserData } from './dto/userAuth';

@Injectable()
export class UsersService {
  constructor(
    private userDetailsService: UserDetailsService,
    private userRoleService: UserRolesService,
    private gendersService: GendersService,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = (
      await User.find({
        relations: ['userRole'],
        where: {
          email,
        },
      })
    )[0];

    return user;
  }

  async getUserDataWithDetails(email: string): Promise<any> {
    const result = await this.findOneByEmail(email);
    if (!result) return result;

    const details = await this.userDetailsService.findUserDetails(result);
    const { id, password, userRole, ...userData } = result;
    if (!details) return { ...userData, role: userRole.role };

    const { user, gender, ...userDetails } = details;
    return {
      ...userData,
      ...userDetails,
      role: userRole.role,
      gender: gender.gender,
    };
  }

  async getUserData(email: string): Promise<any> {
    const result = await this.findOneByEmail(email);
    if (!result) return result;

    const { id, password, userRole, ...userData } = result;

    return {
      ...userData,
      role: userRole.role,
    };
  }

  private async findUsersWithRole(role: string): Promise<User[]> {
    const users = await User.find({
      relations: ['userRole'],
      where: {
        userRole: { role },
      },
    });
    return users;
  }

  async findAllUsers(): Promise<UserData[]> {
    const users = await User.find({
      relations: ['userRole'],
    });

    const result = users.map((user) => {
      return {
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.userRole.role,
      };
    });
    return result;
  }

  async findAllSwimmers(): Promise<UserData[]> {
    const swimmers = await this.findUsersWithRole('USER');

    const result = swimmers.map((user) => {
      return {
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.userRole.role,
      };
    });
    return result;
  }

  async findAllCoaches(): Promise<UserData[]> {
    const coaches = await this.findUsersWithRole('COACH');

    const result = coaches.map((user) => {
      return {
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.userRole.role,
      };
    });
    return result;
  }

  async createUserWithDetails(
    name: string,
    surname: string,
    email: string,
    hashedPassword: string,
    userRole: string,
    phoneNumber: string,
    gender: string,
  ) {
    const roleResult = await this.userRoleService.findRoleByName(userRole);
    if (!roleResult)
      return {
        status: 400,
        message: 'Failed to add new user. Bad role choosed',
      };
    const newUser = new User(name, surname, email, hashedPassword, roleResult);
    const result = await User.save(newUser);
    if (!result) return { status: 400, message: 'Failed to add new user' };

    try {
      const detailsResult = await this.userDetailsService.crateUserDetails(
        phoneNumber,
        newUser,
        gender,
      );
      if (!detailsResult)
        return {
          status: 400,
          message:
            'Failed to add new user. Failed to create user details. Probably this phone Number is already registered.',
        };
    } catch (err) {
      // removing user if cannot create details for him
      User.remove(newUser);
      return {
        status: 400,
        message:
          'Failed to add new user. Failed to create user details. Probably this phone Number is already registered',
        data: err,
      };
    }

    return {
      status: 201,
      message: 'Successfully created new user account with details',
    };
  }

  async deleteUser(email: string): Promise<MyResponse> {
    const user = await this.findOneByEmail(email);
    const result = await User.remove(user);
    if (!result)
      return {
        status: 404,
        message: 'Cannot remove user with this email address',
      };
    return { status: 200, message: `User with email: ${email} removed` };
  }

  async updateUserImageName(
    email: string,
    imageName: string,
  ): Promise<MyResponse> {
    const user = await this.findOneByEmail(email);
    if (!user || !imageName) {
      return {
        status: 400,
        message: 'Cannot update user image. Unsupported image format',
      };
    }
    return {
      status: 201,
      message: await this.userDetailsService.updateUserImage(user, imageName),
    };
  }

  async removeUserImage(email: string): Promise<MyResponse> {
    const user = await this.findOneByEmail(email);
    if (!user) {
      return {
        status: 400,
        message: 'Cannot remove user image',
      };
    }
    return {
      status: 201,
      message: await this.userDetailsService.updateUserImage(user, null),
    };
  }

  async getUserImageName(email: string): Promise<string> {
    const user = await this.findOneByEmail(email);
    const userDetails = await this.userDetailsService.findUserDetails(user);
    return userDetails?.photo;
  }

  async getAllUserRoles(): Promise<UserRole[]> {
    return await this.userRoleService.findAllRoles();
  }

  async getAllGenders(): Promise<Gender[]> {
    return await this.gendersService.findAllGenders();
  }
}
