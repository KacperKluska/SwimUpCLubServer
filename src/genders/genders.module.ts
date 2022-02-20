import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gender } from 'src/entities/gender.entity';
import { GendersService } from './genders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gender])],
  controllers: [],
  providers: [GendersService],
  exports: [GendersService],
})
export class GendersModule {}
