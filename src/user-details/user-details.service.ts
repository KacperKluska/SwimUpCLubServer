import { Injectable } from '@nestjs/common';
import { UserDetails } from 'src/entities/user-details.entity';
import { User } from 'src/entities/user.entity';
import { GendersService } from 'src/genders/genders.service';

@Injectable()
export class UserDetailsService {
  constructor(private gendersService: GendersService) {}

  async findUserDetails(user: User) {
    const details = (
      await UserDetails.find({
        relations: ['user', 'gender'],
        where: {
          user: user,
        },
      })
    )[0];

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

  async updateUserImage(user: User, imageName: string) {
    const userDetails = await this.findUserDetails(user);
    userDetails.photo = imageName;
    UserDetails.save(userDetails);
    return 'Success';
  }
}
