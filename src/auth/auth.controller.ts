import { Body, Controller, Get, Post } from '@nestjs/common';
import { newUserDTO, userLoginDTO } from 'src/users/dto/userAuth';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  async login(@Body() body: userLoginDTO) {
    return await this.authService.loginUser(body);
  }

  @Get('logout')
  logout() {
    return this.authService.logoutUser();
  }

  @Get('refresh')
  refreshToken() {
    return this.authService.refreshToken();
  }

  @Post('register')
  async register(
    @Body()
    body: newUserDTO,
  ) {
    return await this.authService.registerNewUser(body);
  }
}
