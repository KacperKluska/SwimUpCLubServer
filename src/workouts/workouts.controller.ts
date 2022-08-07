import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PoolLengthsService } from 'src/pool-lengths/pool-lengths.service';
import { SwimmingStylesService } from 'src/swimming-styles/swimming-styles.service';
import { WorkoutTypesService } from 'src/workout-types/workout-types.service';
import { WorkoutsService } from './workouts.service';
import { Response } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Role } from 'src/auth/utils/roles.enum';

@Controller('workouts')
export class WorkoutsController {
  constructor(
    private poolLengthsService: PoolLengthsService,
    private swimmingStylesService: SwimmingStylesService,
    private workoutTypesService: WorkoutTypesService,
    private workoutsService: WorkoutsService,
  ) {}

  @Post()
  @Roles(Role.COACH)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
    @Res() res: Response,
  ) {
    const result = await this.workoutsService.createWorkout(
      body.workoutSessionId,
      body.workoutType,
      body.poolLength,
      body.swimmingStyle,
      body.time,
      body.distance,
    );
    res.status(result.status).send({ message: result.message, ...result.data });
  }

  @Get('poolLengths')
  @Roles(Role.COACH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllPoolLengths(@Res() res: Response) {
    const result = await this.poolLengthsService.findAllPoolLengths();
    res.status(result.status).send({ message: result.message, ...result.data });
  }

  @Get('swimmingStyles')
  @Roles(Role.COACH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllSwimmingStyles(@Res() res: Response) {
    const result = await this.swimmingStylesService.findAllSwimmingStyles();
    res.status(result.status).send({ message: result.message, ...result.data });
  }

  @Get('workoutTypes')
  @Roles(Role.COACH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllWorkoutTypes(@Res() res: Response) {
    const result = await this.workoutTypesService.findAllWorkoutTypes();
    res.status(result.status).send({ message: result.message, ...result.data });
  }

  @Delete('/:id')
  @Roles(Role.COACH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteWorkout(@Param('id') id: string, @Res() res: Response) {
    const result = await this.workoutsService.deleteWorkout(id);
    res.status(result.status).send({ message: result.message, ...result.data });
  }

  @Get('/:id')
  async getWorkout(@Param('id') id: string) {
    return await this.workoutsService.getWorkoutById(id);
  }

  @Get()
  @Roles(Role.COACH, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllWorkouts(
    @Query() query: { workoutSessionId: string },
    @Res() res: Response,
  ) {
    const result = await this.workoutsService.getAllWorkoutsByWorkoutSessionId(
      query.workoutSessionId,
    );
    res.status(result.status).send({ message: result.message, ...result.data });
  }
}
