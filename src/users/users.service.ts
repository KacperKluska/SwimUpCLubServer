import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserRolesService } from 'src/user-roles/user-roles.service';
import { Response } from 'src/shared_dto/response';

@Injectable()
export class UsersService {
  constructor(private userRolesService: UserRolesService) {}

  findOneByEmail(email: string): Promise<User | undefined> {
    // return User.find({
    //   relations: ['userRole'],
    //   where: {
    //     email,
    //   },
    // });

    // return User.find({ relations: ['userRole'] });
    return User.findOne({ email });

    // return User.find({
    //   join: {
    //     alias: 'user',
    //     leftJoinAndSelect: {
    //       userRole: 'user.userRole',
    //     },
    //   },
    // });
  }
}
