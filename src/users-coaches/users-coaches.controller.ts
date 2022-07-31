import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Role } from 'src/auth/utils/roles.enum';
import { UsersCoachesService } from './users-coaches.service';

interface EmailsBody {
  swimmerEmail: string;
  coachEmail: string;
}

@Controller('users-coaches')
export class UsersCoachesController {
  constructor(private usersCoachesService: UsersCoachesService) {}

  @Post()
  @Roles(Role.COACH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createSwimmerCoachRecord(
    @Body() body: EmailsBody,
    @Res() res: Response,
  ) {
    const result = await this.usersCoachesService.createCoachSwimmerRecord(
      body.swimmerEmail,
      body.coachEmail,
    );
    res.status(result.status).send({ message: result.message, ...result.data });
  }

  @Delete()
  @Roles(Role.COACH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteSwimmerCoachRecord(
    @Body() body: EmailsBody,
    @Res() res: Response,
  ) {
    const result = await this.usersCoachesService.deleteCoachSwimmerRecord(
      body.swimmerEmail,
      body.coachEmail,
    );
    res.status(result.status).send({ message: result.message, ...result.data });
  }

  @Get('forCoach')
  @Roles(Role.COACH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAllSwimmersForCoach(
    @Query('email') email: string,
    @Res() res: Response,
  ) {
    const result = await this.usersCoachesService.findAllSwimmersForCoach(
      email,
    );
    res.status(result.status).send({ message: result.message, ...result.data });
  }

  @Get('forSwimmer')
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAllCoachesForSwimmer(
    @Query('email') email: string,
    @Res() res: Response,
  ) {
    const result = await this.usersCoachesService.findAllCoachesForSwimmer(
      email,
    );
    res.status(result.status).send({ message: result.message, ...result.data });
  }
}
