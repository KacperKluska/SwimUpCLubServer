import { Injectable } from '@nestjs/common';
import { Event } from 'src/entities/event.entity';
import { User } from 'src/entities/user.entity';
import { serverErrorResponse } from 'src/shared_dto/error';
import { MyResponse } from 'src/shared_dto/response';
import { UsersService } from 'src/users/users.service';

export interface EventData {
  swimmerEmail: string;
  coachEmail: string;
  startDate: Date;
  endDate: Date;
  title: string;
}

@Injectable()
export class EventsService {
  constructor(private usersService: UsersService) {}

  async createEvent(data: EventData): Promise<MyResponse> {
    try {
      const { swimmerEmail, coachEmail, startDate, endDate, title } = data;
      const swimmer = await this.usersService.findOneByEmail(swimmerEmail);
      const coach = await this.usersService.findOneByEmail(coachEmail);
      if (
        !swimmer ||
        !coach ||
        swimmer.userRole.role !== 'USER' ||
        coach.userRole.role !== 'COACH'
      ) {
        return { status: 400, message: `You provided incorrect emails.` };
      }

      const currentDate = new Date();
      const dateStart = new Date(startDate);
      const dateEnd = new Date(endDate);
      if (
        dateEnd <= dateStart ||
        dateEnd < currentDate ||
        dateStart < currentDate
      ) {
        return { status: 400, message: `You provided incorrect dates.` };
      }
      if (title === '') {
        return { status: 400, message: `You provided empty title.` };
      }

      const newEvent = new Event(swimmer, coach, dateStart, dateEnd, title);
      await Event.save(newEvent);

      return { status: 201, message: `Event created.` };
    } catch (error) {
      return serverErrorResponse(error);
    }
  }

  async getAllEventsForUser(
    email: string,
    role: 'COACH' | 'USER',
  ): Promise<MyResponse> {
    try {
      const user = await this.usersService.findOneByEmail(email);
      if (!user) {
        return { status: 400, message: `You provided incorrect email.` };
      }

      const where: { coach?: User; swimmer?: User } = {};
      if (role === 'COACH') {
        where.coach = user;
      } else if (role === 'USER') {
        where.swimmer = user;
      }

      const events = await Event.find({
        relations: ['coach', 'swimmer'],
        where,
        order: {
          dateStart: 'DESC',
        },
      });

      return {
        status: 200,
        message: `Success.`,
        data: { events },
      };
    } catch (error) {
      return serverErrorResponse(error);
    }
  }
}
