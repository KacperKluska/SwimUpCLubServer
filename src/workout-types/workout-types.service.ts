import { Injectable } from '@nestjs/common';
import { WorkoutTypes } from 'src/entities/workout-types.entity';

@Injectable()
export class WorkoutTypesService {
  async findAllWorkoutTypes(): Promise<WorkoutTypes[]> {
    return await WorkoutTypes.find();
  }

  async findWorkoutTypeByName(type: string): Promise<WorkoutTypes> {
    return await WorkoutTypes.findOne({ type });
  }
}
