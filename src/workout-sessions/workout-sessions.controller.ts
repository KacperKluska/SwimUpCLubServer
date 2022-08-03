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
import { WorkoutSessionsService } from './workout-sessions.service';
import { Response } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Role } from 'src/auth/utils/roles.enum';

@Controller('workout-sessions')
export class WorkoutSessionsController {
  // TODO create endpoints for GET (by date)
  constructor(private workoutSessionService: WorkoutSessionsService) {}

  // TODO refactor others like that one
  @Post()
  @Roles(Role.COACH)
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @Delete()
  @Roles(Role.COACH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteWorkoutSession(@Query('id') id, @Res() res: Response) {
    const result = await this.workoutSessionService.deleteWorkoutSession(id);
    res.status(result.status).send({ message: result.message, ...result.data });
  }

  @Get('forSwimmer')
  @Roles(Role.COACH, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getSwimmerWorkoutSessions(@Query() query: { email: string }) {
    return await this.workoutSessionService.getSwimmerWorkoutSessions(
      query.email,
    );
  }

  @Get('forCoach')
  @Roles(Role.COACH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getCoachWorkoutSessions(@Query() query: { email: string }) {
    return await this.workoutSessionService.getCoachWorkoutSessions(
      query.email,
    );
  }

  @Get('/:id')
  @Roles(Role.COACH, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getWorkoutSessionById(@Param('id') id: string) {
    return await this.workoutSessionService.getWorkoutSessionById(id);
  }
}
