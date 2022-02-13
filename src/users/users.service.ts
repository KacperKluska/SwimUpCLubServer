import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserRolesService } from 'src/user-roles/user-roles.service';

@Injectable()
export class UsersService {
  constructor(private userRolesService: UserRolesService) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    const users = await User.find({
      relations: ['userRole'],
      where: {
        email,
      },
    });

    return users[0];
  }
}
