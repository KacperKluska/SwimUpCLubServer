import { Body, Controller, Delete, Get, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Role } from 'src/auth/utils/roles.enum';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async findUser(@Req() request) {
    return await this.userService.findOneByEmail(request.user.email);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAllUsers() {
    return await this.userService.findAllUsers();
  }

  @Get('swimmers')
  @Roles(Role.ADMIN, Role.COACH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAllSwimmers() {
    return await this.userService.findAllSwimmers();
  }

  @Get('coaches')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAllCoaches() {
    return await this.userService.findAllCoaches();
  }

  @Delete()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUser(@Body() body: { email: string }) {
    return await this.userService.deleteUser(body.email);
  }
}
