import { Injectable } from '@nestjs/common';
import { UserRole } from 'src/entities/user-role.entity';

@Injectable()
export class UserRolesService {
  findRoleByName(role: string): Promise<UserRole> {
    return UserRole.findOne({ role });
  }
}
