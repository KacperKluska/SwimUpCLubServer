import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersCoaches } from 'src/entities/users-coaches.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersCoachesController } from './users-coaches.controller';
import { UsersCoachesService } from './users-coaches.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersCoaches]), UsersModule],
  controllers: [UsersCoachesController],
  providers: [UsersCoachesService],
})
export class UsersCoachesModule {}
