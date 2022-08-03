import { Injectable } from '@nestjs/common';
import { WorkoutSession } from 'src/entities/workout-session.entity';
import { MyResponse } from 'src/shared_dto/response';
import { UsersService } from 'src/users/users.service';
import { serverErrorResponse } from 'src/shared_dto/error';

@Injectable()
export class WorkoutSessionsService {
  constructor(private usersService: UsersService) {}

  async createWorkoutSession(
    swimmerEmail: string,
    coachEmail: string,
  ): Promise<MyResponse> {
    try {
      if (swimmerEmail === coachEmail)
        return { status: 400, message: 'Emails are equal!' };
      const swimmer = await this.usersService.findOneByEmail(swimmerEmail);
      const coach = await this.usersService.findOneByEmail(coachEmail);

      if (
        !coach ||
        !swimmer ||
        coach.userRole.role !== 'COACH' ||
        swimmer.userRole.role !== 'USER'
      )
        return { status: 400, message: `You provided incorrect emails.` };

      const currentDate = new Date();
      const workoutSession = new WorkoutSession(swimmer, coach, currentDate);
      const result = await WorkoutSession.save(workoutSession);

      return {
        status: 201,
        message: `Successfully created workout session.`,
        data: result,
      };
    } catch (error) {
      return serverErrorResponse(error);
    }
  }

  async getSwimmerWorkoutSessions(swimmerEmail: string) {
    const swimmer = await this.usersService.findOneByEmail(swimmerEmail);

    if (!swimmer || swimmer.userRole.role !== 'USER')
      return { status: 400, message: `You provided incorrect email.` };

    const result = await WorkoutSession.find({
      relations: ['coach', 'swimmer'],
      where: { swimmer: swimmer },
    });

    return { status: 200, message: `Success`, data: result };
  }

  async getCoachWorkoutSessions(coachEmail: string) {
    const coach = await this.usersService.findOneByEmail(coachEmail);

    if (!coach || coach.userRole.role !== 'COACH')
      return { status: 400, message: `You provided incorrect email.` };

    const result = await WorkoutSession.find({
      relations: ['coach', 'swimmer'],
      where: { coach: coach },
    });

    return { status: 200, message: `Success`, data: result };
  }

  async getWorkoutSessionById(workoutSessionId: string) {
    return await WorkoutSession.findOne({
      where: { id: workoutSessionId },
    });
  }

  async deleteWorkoutSession(id: string): Promise<MyResponse> {
    try {
      const ws = await this.getWorkoutSessionById(id);
      if (!ws) {
        return {
          status: 400,
          message: `Couldn't find workout session.`,
        };
      }
      await WorkoutSession.remove(ws);
      return {
        status: 200,
        message: `Workout session removed.`,
      };
    } catch (error) {
      return serverErrorResponse(error);
    }
  }
}
