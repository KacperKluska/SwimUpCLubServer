import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetails } from 'src/entities/user-details.entity';
import { GendersModule } from 'src/genders/genders.module';
import { UserDetailsService } from './user-details.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserDetails]), GendersModule],
  controllers: [],
  providers: [UserDetailsService],
  exports: [UserDetailsService],
})
export class UserDetailsModule {}
