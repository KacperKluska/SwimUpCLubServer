import { Injectable } from '@nestjs/common';
import { WorkoutSession } from 'src/entities/workout-session.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WorkoutSessionsService {
  constructor(private usersService: UsersService) {}

  async createWorkoutSession(swimmerEmail: string, coachEmail: string) {
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
      return {
        status: 500,
        message: `Couldn't create workout session.`,
        data: error,
      };
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
}
