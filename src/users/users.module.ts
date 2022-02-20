import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRolesService } from 'src/user-roles/user-roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserRolesService],
  controllers: [UsersController],
  providers: [UsersService, UserRolesService],
  exports: [UsersService],
})
export class UsersModule {}
