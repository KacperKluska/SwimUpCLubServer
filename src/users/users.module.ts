import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRolesModule } from 'src/user-roles/user-roles.module';
import { UserDetailsModule } from 'src/user-details/user-details.module';
import { GendersModule } from 'src/genders/genders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserRolesModule,
    UserDetailsModule,
    GendersModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
