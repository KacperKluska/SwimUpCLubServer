import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Role } from 'src/auth/utils/roles.enum';
import {
  OtherUserDataToUpdate,
  OtherUserDetailsToUpdate,
  UserDataToUpdate,
  UserDetailsToUpdate,
} from './dto/userData';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async findUser(@Req() request) {
    return await this.userService.getUserDataWithDetails(request.user.email);
  }

  @Get('other-user')
  @Roles(Role.ADMIN, Role.COACH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOtherUser(@Query('email') email) {
    return await this.userService.getUserDataWithDetails(email);
  }

  @Patch('other-user')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateOtherUserData(
    @Req() request,
    @Body() body: OtherUserDataToUpdate,
    @Res() response: Response,
  ) {
    const result = await this.userService.updateUserData(
      body.email,
      body.newName,
      body.newSurname,
      body.newEmail,
    );
    response.status(result.status).send({ ...result });
  }

  @Patch('other-user/details')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateOtherUserDetails(
    @Req() request,
    @Body() body: OtherUserDetailsToUpdate,
    @Res() response: Response,
  ) {
    const result = await this.userService.updateUserDetails(
      body.email,
      body.newAge,
      body.newWeight,
      body.newHeight,
      body.newPhoneNumber,
    );
    response.status(result.status).send({ ...result });
  }

  @Patch('user')
  @UseGuards(JwtAuthGuard)
  async updateUserData(
    @Req() request,
    @Body() body: UserDataToUpdate,
    @Res() response: Response,
  ) {
    const result = await this.userService.updateUserData(
      request.user.email,
      body.newName,
      body.newSurname,
      body.newEmail,
    );
    response.status(result.status).send({ ...result });
  }

  @Patch('user/details')
  @UseGuards(JwtAuthGuard)
  async updateUserDetails(
    @Req() request,
    @Body() body: UserDetailsToUpdate,
    @Res() response: Response,
  ) {
    const result = await this.userService.updateUserDetails(
      request.user.email,
      body.newAge,
      body.newWeight,
      body.newHeight,
      body.newPhoneNumber,
    );
    response.status(result.status).send({ ...result });
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
  async deleteUser(@Query('email') email, @Res() res: Response) {
    const result = await this.userService.deleteUser(email);
    res.status(result.status).send(result.message);
  }

  @Get('genders')
  async getAllGenders() {
    return await this.userService.getAllGenders();
  }

  @Get('roles')
  async getAllUserRoles() {
    return await this.userService.getAllUserRoles();
  }
}
