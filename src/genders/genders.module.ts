import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gender } from 'src/entities/gender.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gender])],
  controllers: [],
  providers: [],
})
export class GendersModule {}
