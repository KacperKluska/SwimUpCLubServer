import { Injectable } from '@nestjs/common';
import { WorkoutTypes } from 'src/entities/workout-types.entity';
import { WorkoutTypesModule } from './workout-types.module';

@Injectable()
export class WorkoutTypesService {
  async findAllWorkoutTypes(): Promise<WorkoutTypes[]> {
    return await WorkoutTypes.find();
  }

  async findWorkoutTypeByName(type: string): Promise<WorkoutTypesModule> {
    return await WorkoutTypes.findOne({ type });
  }
}
