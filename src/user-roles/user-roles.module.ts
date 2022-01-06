import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from 'src/entities/user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  controllers: [],
  providers: [],
})
export class UserRolesModule {}
