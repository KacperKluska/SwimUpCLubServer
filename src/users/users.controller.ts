import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async findUser(@Req() request) {
    return await this.userService.findOneByEmail(request.user.email);
  }
}
