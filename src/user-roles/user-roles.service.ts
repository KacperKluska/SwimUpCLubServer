import { Injectable } from '@nestjs/common';
import { UserRole } from 'src/entities/user-role.entity';

@Injectable()
export class UserRolesService {
  async findRoleByName(role: string): Promise<UserRole> {
    return UserRole.findOne({ role });
  }

  async findAllRoles(): Promise<UserRole[]> {
    return await UserRole.find();
  }
}
