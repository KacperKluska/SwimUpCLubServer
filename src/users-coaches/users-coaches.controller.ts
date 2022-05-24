import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { UsersCoachesService } from './users-coaches.service';

@Controller('users-coaches')
export class UsersCoachesController {
  constructor(private usersCoachesService: UsersCoachesService) {}

  @Post()
  async createSwimmerCoachRecord(
    @Body() body: { swimmerEmail: string; coachEmail: string },
  ) {
    return await this.usersCoachesService.createCoachSwimmerRecord(
      body.swimmerEmail,
      body.coachEmail,
    );
  }

  @Delete()
  async deleteSwimmerCoachRecord(
    @Body() body: { swimmerEmail: string; coachEmail: string },
  ) {
    return await this.usersCoachesService.deleteCoachSwimmerRecord(
      body.swimmerEmail,
      body.coachEmail,
    );
  }

  @Get('forCoach')
  async findAllSwimmersForCoach(@Query() query: { email: string }) {
    return await this.usersCoachesService.findAllSwimmersForCoach(query.email);
  }

  @Get('forSwimmer')
  async findAllCoachesForSwimmer(@Query() query: { email: string }) {
    return await this.usersCoachesService.findAllCoachesForSwimmer(query.email);
  }
}
