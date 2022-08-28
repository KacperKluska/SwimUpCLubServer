import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Role } from 'src/auth/utils/roles.enum';
import { EventData, EventsService } from './events.service';
import { Response } from 'express';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  @Roles(Role.COACH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createEvent(@Body() event: EventData, @Res() res: Response) {
    const result = await this.eventsService.createEvent(event);
    res.status(result.status).send({ message: result.message, ...result.data });
  }

  @Get('forSwimmer')
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getEventsForSwimmer(
    @Query('email') email: string,
    @Res() res: Response,
  ) {
    const result = await this.eventsService.getAllEventsForUser(email, 'USER');
    res.status(result.status).send({ message: result.message, ...result.data });
  }

  @Get('forCoach')
  @Roles(Role.COACH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getEventsForCoach(@Query('email') email: string, @Res() res: Response) {
    const result = await this.eventsService.getAllEventsForUser(email, 'COACH');
    res.status(result.status).send({ message: result.message, ...result.data });
  }
}
