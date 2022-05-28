import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { WorkoutSessionsService } from './workout-sessions.service';

@Controller('workout-sessions')
export class WorkoutSessionsController {
  // TODO create endpoints for GET (by date)
  constructor(private workoutSessionService: WorkoutSessionsService) {}

  @Post()
  async createWorkoutSession(
    @Body() body: { swimmerEmail: string; coachEmail: string },
  ) {
    return await this.workoutSessionService.createWorkoutSession(
      body.swimmerEmail,
      body.coachEmail,
    );
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
  async getWorkoutSessionById(@Param() id: string) {
    return await this.workoutSessionService.getWorkoutSessionById(id);
  }
}
