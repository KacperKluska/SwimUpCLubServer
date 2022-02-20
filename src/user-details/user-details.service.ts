import { Injectable } from '@nestjs/common';
import { Gender } from 'src/entities/gender.entity';
import { UserDetails } from 'src/entities/user-details.entity';
import { User } from 'src/entities/user.entity';
import { GendersService } from 'src/genders/genders.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserDetailsService {
  constructor(private gendersService: GendersService) {}

  async findUserDetails(user: User) {
    const details = (
      await UserDetails.find({
        relations: ['users', 'genders'],
        where: {
          users: user,
        },
      })
    )[0];

    console.log(details);
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
}
