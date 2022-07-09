import { Injectable } from '@nestjs/common';
import { UserDetails } from 'src/entities/user-details.entity';
import { User } from 'src/entities/user.entity';
import { GendersService } from 'src/genders/genders.service';
import { MyResponse } from 'src/shared_dto/response';

@Injectable()
export class UserDetailsService {
  constructor(private gendersService: GendersService) {}

  async findUserDetails(user: User) {
    const details = await UserDetails.findOne({
      relations: ['user', 'gender'],
      where: {
        user: user,
      },
    });

    return details;
  }

  async crateUserDetails(phoneNumber: string, user: User, gender: string) {
    const genderResult = await this.gendersService.findByName(gender);

    const newUserDetails = new UserDetails(
      phoneNumber,
      genderResult,
      user,
      null,
      null,
      null,
      null,
    );
    const result = await UserDetails.save(newUserDetails);
    if (!result)
      return { status: 400, message: 'Failed to add new user details' };

    return result;
  }

  async updateUserImage(
    user: User,
    imageName: string | null,
  ): Promise<MyResponse> {
    try {
      const userDetails = await this.findUserDetails(user);
      userDetails.photo = imageName;
      await UserDetails.save(userDetails);
    } catch (error) {
      return {
        status: 400,
        message: 'There was an unexpected error',
        data: error,
      };
    }
    return { status: 201, message: 'Successfully updated user image.' };
  }

  async updateUserDetails(
    user: User,
    newAge: number,
    newWeight: number,
    newHeight: number,
    newPhoneNumber: string,
  ): Promise<MyResponse> {
    try {
      const userDetails = await this.findUserDetails(user);
      if (!userDetails)
        return { status: 404, message: "Couldn't find user details." };
      userDetails.age = newAge;
      userDetails.weight = newWeight;
      userDetails.height = newHeight;
      userDetails.phoneNumber = newPhoneNumber;
      await UserDetails.save(userDetails);
    } catch (error) {
      return {
        status: 400,
        message: 'There was an unexpected error',
        data: error,
      };
    }
    return { status: 201, message: 'Successfully updated user details.' };
  }
}
