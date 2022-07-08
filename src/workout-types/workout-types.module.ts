import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutTypes } from 'src/entities/workout-types.entity';
import { WorkoutTypesService } from './workout-types.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutTypes])],
  controllers: [],
  providers: [WorkoutTypesService],
  exports: [WorkoutTypesService],
})
export class WorkoutTypesModule {}
