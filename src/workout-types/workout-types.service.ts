import { Injectable } from '@nestjs/common';
import { WorkoutTypes } from 'src/entities/workout-types.entity';
import { MyResponse } from 'src/shared_dto/response';
import { serverErrorResponse } from 'src/shared_dto/error';

@Injectable()
export class WorkoutTypesService {
  async findAllWorkoutTypes(): Promise<MyResponse> {
    try {
      const workoutTypes = await WorkoutTypes.find();
      return {
        status: 200,
        data: { workoutTypes },
        message: `Success`,
      };
    } catch (error) {
      return serverErrorResponse(error);
    }
  }

  async findWorkoutTypeByName(type: string): Promise<WorkoutTypes> {
    return await WorkoutTypes.findOne({ type });
  }
}
