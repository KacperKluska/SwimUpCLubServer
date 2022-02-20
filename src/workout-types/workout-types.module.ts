import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutTypes } from 'src/entities/workout-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutTypes])],
  controllers: [],
  providers: [],
})
export class WorkoutTypesModule {}
