import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { newUserDTO, userLoginDTO } from './dto/userAuth';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('hello')
  helloUser(@Query() query: { email }) {
    return { msg: `Hello ${query.email}` };
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async findUser(@Query() query: { email }) {
    return await this.userService.findOneByEmail(query.email);
  }
}
