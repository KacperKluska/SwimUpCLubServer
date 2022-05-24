import { Injectable } from '@nestjs/common';
import { UsersCoaches } from 'src/entities/users-coaches.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UsersCoachesService {
  constructor(private usersService: UsersService) {}

  async findAllSwimmersForCoach(coachEmail: string) {
    const coach = await this.usersService.findOneByEmail(coachEmail);

    if (!coach || coach.userRole.role !== 'COACH')
      return { status: 400, message: `You provided incorrect email.` };

    const result = await UsersCoaches.find({
      relations: ['coach', 'swimmer'],
      where: { coach: coach },
    });
    if (!result?.length) return undefined;

    const { password, ...coachData } = result[0].coach;
    return {
      coach: coachData,
      swimmers: result.map((item) => {
        const { password, ...data } = item.swimmer;
        return data;
      }),
    };
  }

  async findAllCoachesForSwimmer(swimmerEmail: string) {
    const swimmer = await this.usersService.findOneByEmail(swimmerEmail);

    if (!swimmer || swimmer.userRole.role !== 'USER')
      return { status: 400, message: `You provided incorrect email.` };

    const result = await UsersCoaches.find({
      relations: ['coach', 'swimmer'],
      where: { swimmer: swimmer },
    });
    if (!result?.length) return undefined;

    const { password, ...swimmerData } = result[0].swimmer;
    return {
      swimmer: swimmerData,
      coaches: result.map((item) => {
        const { password, ...data } = item.coach;
        return data;
      }),
    };
  }

  async createCoachSwimmerRecord(swimmerEmail: string, coachEmail: string) {
    if (swimmerEmail === coachEmail) return 'Emails are equal!';
    const swimmer = await this.usersService.findOneByEmail(swimmerEmail);
    const coach = await this.usersService.findOneByEmail(coachEmail);

    const result = await UsersCoaches.findOne({
      where: { swimmer, coach },
    });
    if (result)
      return { status: 400, message: `This relation already exists.` };

    if (
      !coach ||
      !swimmer ||
      coach.userRole.role !== 'COACH' ||
      swimmer.userRole.role !== 'USER'
    )
      return { status: 400, message: `You provided incorrect emails.` };

    const newRecord = new UsersCoaches(swimmer, coach);

    await UsersCoaches.save(newRecord);
    return {
      status: 200,
      message: `Successfully created relation for those users.`,
    };
  }

  async deleteCoachSwimmerRecord(swimmerEmail: string, coachEmail: string) {
    const swimmer = await this.usersService.findOneByEmail(swimmerEmail);
    const coach = await this.usersService.findOneByEmail(coachEmail);

    if (
      !coach ||
      !swimmer ||
      coach.userRole.role !== 'COACH' ||
      swimmer.userRole.role !== 'USER'
    )
      return { status: 400, message: 'Invalid emails.' };

    const result = await UsersCoaches.findOne({
      where: { swimmer, coach },
    });

    if (!result)
      return {
        status: 404,
        message: `Couldn't find relation for those users.`,
      };

    await UsersCoaches.remove(result);
    return {
      status: 200,
      message: `Successfully removed relation for those users.`,
    };
  }
}
