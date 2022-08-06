import { Injectable } from '@nestjs/common';
import { Workout } from 'src/entities/workout.entity';
import { PoolLengthsService } from 'src/pool-lengths/pool-lengths.service';
import { MyResponse } from 'src/shared_dto/response';
import { SwimmingStylesService } from 'src/swimming-styles/swimming-styles.service';
import { WorkoutSessionsService } from 'src/workout-sessions/workout-sessions.service';
import { WorkoutTypesService } from 'src/workout-types/workout-types.service';
import { serverErrorResponse } from 'src/shared_dto/error';

// TIME pattern: HH:MM:SS
const TIME_PATTERN = /^[0-9]{2}\:[0-9]{2}\:[0-9]{2}$/;

@Injectable()
export class WorkoutsService {
  constructor(
    private poolLengthsService: PoolLengthsService,
    private swimmingStylesService: SwimmingStylesService,
    private workoutTypesService: WorkoutTypesService,
    private workoutSessionsService: WorkoutSessionsService,
  ) {}

  async createWorkout(
    workoutSessionId: string,
    workoutTypeName: string,
    poolLengthDistance: number,
    swimmingStyleName: string,
    time: string,
    distance: number,
  ): Promise<MyResponse> {
    try {
      const workoutSession =
        await this.workoutSessionsService.getWorkoutSessionById(
          workoutSessionId,
        );
      const workoutType = await this.workoutTypesService.findWorkoutTypeByName(
        workoutTypeName,
      );
      const poolLength = await this.poolLengthsService.findPoolLengthByLength(
        poolLengthDistance,
      );
      const swimmingStyle =
        await this.swimmingStylesService.findSwimmingStyleByName(
          swimmingStyleName,
        );

      if (
        !workoutSession ||
        !workoutType ||
        !poolLength ||
        !swimmingStyle ||
        distance <= 0
      )
        return { status: 400, message: 'Invalid input' };

      if (!TIME_PATTERN.test(time))
        return { status: 400, message: 'Invalid time format. Try HH:MM:SS.' };

      // [0] - hours, [1] - minutes, [2] - seconds
      const timeArray = time.split(':');
      const totalTimeInSeconds =
        Number(timeArray[0]) * 3600 +
        Number(timeArray[1]) * 60 +
        Number(timeArray[2]);

      // m/s multiple by 3.6 give us km/h
      const averageSpeed = Number(
        ((distance / totalTimeInSeconds) * 3.6).toFixed(2),
      );
      // averagePace is in seconds/100m, need to convert to (minutes and seconds)/100m on FE
      const averagePace = Number(
        ((totalTimeInSeconds * 100) / distance).toFixed(2),
      );

      const workoutToSave = new Workout(
        time,
        distance,
        workoutSession,
        workoutType,
        swimmingStyle,
        poolLength,
        averageSpeed,
        averagePace,
      );
      const workout = await Workout.save(workoutToSave);
      return { status: 200, message: 'Workout created', data: { workout } };
    } catch (error) {
      return serverErrorResponse(error);
    }
  }

  async deleteWorkout(workoutId: string): Promise<MyResponse> {
    try {
      const workout = await this.getWorkoutById(workoutId);
      if (!workout) return { status: 400, message: `Couldn't find workout!` };

      await Workout.remove(workout);
      return { status: 200, message: `Workout removed!` };
    } catch (error) {
      return serverErrorResponse(error);
    }
  }

  async getWorkoutById(workoutId: string) {
    return await Workout.findOne({
      relations: [
        'workoutTypes',
        'swimmingStyle',
        'poolLength',
        'workoutSession',
      ],
      where: { id: workoutId },
    });
  }

  async getAllWorkoutsByWorkoutSessionId(
    workoutSessionId: string,
  ): Promise<MyResponse> {
    try {
      const workouts = await Workout.find({
        relations: [
          'workoutTypes',
          'swimmingStyle',
          'poolLength',
          'workoutSession',
        ],
        where: { workoutSession: { id: workoutSessionId } },
      });
      return {
        status: 200,
        message: `Success`,
        data: { workouts },
      };
    } catch (error) {
      return serverErrorResponse(error);
    }
  }
}
