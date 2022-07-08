import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PoolLengthsService } from 'src/pool-lengths/pool-lengths.service';
import { SwimmingStylesService } from 'src/swimming-styles/swimming-styles.service';
import { WorkoutTypesService } from 'src/workout-types/workout-types.service';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(
    private poolLengthsService: PoolLengthsService,
    private swimmingStylesService: SwimmingStylesService,
    private workoutTypesService: WorkoutTypesService,
    private workoutsService: WorkoutsService,
  ) {}

  @Post()
  async createWorkout(
    @Body()
    body: {
      workoutSessionId: string;
      workoutType: string;
      poolLength: number;
      swimmingStyle: string;
      time: string;
      distance: number;
    },
  ) {
    return await this.workoutsService.createWorkout(
      body.workoutSessionId,
      body.workoutType,
      body.poolLength,
      body.swimmingStyle,
      body.time,
      body.distance,
    );
  }

  // TODO handle empty answer when couldn't find poolLength, swimmingStyle or workoutType
  @Get('poolLengths')
  async getAllPoolLengths() {
    return await this.poolLengthsService.findAllPoolLengths();
  }

  @Get('poolLength')
  async getPoolLengthByLength(@Query() query: { length: number }) {
    return await this.poolLengthsService.findPoolLengthByLength(query.length);
  }

  @Get('swimmingStyles')
  async getAllSwimmingStyles() {
    return await this.swimmingStylesService.findAllSwimmingStyles();
  }

  @Get('swimmingStyle')
  async getSwimmingStyleByName(@Query() query: { name: string }) {
    return await this.swimmingStylesService.findSwimmingStyleByName(query.name);
  }

  @Get('workoutTypes')
  async getAllWorkoutTypes() {
    return await this.workoutTypesService.findAllWorkoutTypes();
  }

  @Get('workoutType')
  async getWorkoutTypeByName(@Query() query: { name: string }) {
    return await this.workoutTypesService.findWorkoutTypeByName(query.name);
  }

  @Delete('/:id')
  async deleteWorkout(@Param('id') id: string) {
    return await this.workoutsService.deleteWorkout(id);
  }

  @Get('/:id')
  async getWorkout(@Param('id') id: string) {
    return await this.workoutsService.getWorkoutById(id);
  }

  @Get()
  async getAllWorkouts(@Query() query: { workoutSessionId: string }) {
    return await this.workoutsService.getAllWorkoutsByWorkoutSessionId(
      query.workoutSessionId,
    );
  }
}
