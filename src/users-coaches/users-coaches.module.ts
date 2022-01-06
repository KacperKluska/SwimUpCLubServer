import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersCoaches } from 'src/entities/users-coaches.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersCoaches])],
  controllers: [],
  providers: [],
})
export class UsersCoachesModule {}
