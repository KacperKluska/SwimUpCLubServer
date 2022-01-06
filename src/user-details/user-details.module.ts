import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetails } from 'src/entities/user-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserDetails])],
  controllers: [],
  providers: [],
})
export class UserDetailsModule {}
