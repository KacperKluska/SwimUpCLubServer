import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { WorkoutSessionsService } from './workout-sessions.service';
import { Response } from 'express';

@Controller('workout-sessions')
export class WorkoutSessionsController {
  // TODO create endpoints for GET (by date)
  constructor(private workoutSessionService: WorkoutSessionsService) {}

  // TODO refactor others like that one
  @Post()
  async createWorkoutSession(
    @Body() body: { swimmerEmail: string; coachEmail: string },
    @Res() res: Response,
  ) {
    const result = await this.workoutSessionService.createWorkoutSession(
      body.swimmerEmail,
      body.coachEmail,
    );
    res.status(result.status).send({ message: result.message, ...result.data });
  }

  @Get('forSwimmer')
  async getSwimmerWorkoutSessions(@Query() query: { email: string }) {
    return await this.workoutSessionService.getSwimmerWorkoutSessions(
      query.email,
    );
  }

  @Get('forCoach')
  async getCoachWorkoutSessions(@Query() query: { email: string }) {
    return await this.workoutSessionService.getCoachWorkoutSessions(
      query.email,
    );
  }

  @Get('/:id')
  async getWorkoutSessionById(@Param('id') id: string) {
    return await this.workoutSessionService.getWorkoutSessionById(id);
  }
}
