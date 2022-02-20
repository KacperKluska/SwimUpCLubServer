import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { NewUserDTO, UserLoginDTO } from 'src/users/dto/userAuth';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { MyResponse } from 'src/shared_dto/response';
import { JwtAuthGuard } from './guards';
import { Roles } from './decorators/roles.decorator';
import { Role } from './utils/roles.enum';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  async login(
    @Body() body: UserLoginDTO,
    @Res({ passthrough: true }) response,
  ) {
    return await this.authService.loginUser(body, response);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  logout(@Res({ passthrough: true }) response: Response): MyResponse {
    return this.authService.logoutUser(response);
  }

  @Get('refresh')
  @UseGuards(JwtAuthGuard)
  async refreshToken(
    @Req() request,
    @Res({ passthrough: true }) response,
  ): Promise<MyResponse> {
    const result = await this.authService.refreshToken(
      response,
      request.user.email,
      request.user.role,
    );
    return {
      ...result,
      data: { email: request.user.email, role: request.user.role },
    };
  }

  @Post('register')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async register(
    @Body()
    body: NewUserDTO,
  ): Promise<MyResponse> {
    return await this.authService.registerNewUser(body);
  }
}
