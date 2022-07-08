import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerUserOptions } from './config/multerUser.config';
import { multerServerOptions } from './config/multerServer.config';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Controller('uploads')
export class UploadsController {
  constructor(private usersService: UsersService) {}

  @Post('server-file')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo', multerServerOptions))
  async uploadServerFile(@Req() req: Request, @UploadedFile() file) {
    return { message: 'File uploaded' };
  }

  @Get('server-file')
  getServerImage(
    @Query() query: { imgName: string },
    @Res() response: Response,
  ) {
    response.sendFile(query.imgName, { root: process.env.UPLOAD_SERVER_DIR });
  }

  @Post('file')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo', multerUserOptions))
  async uploadFile(@Req() req, @UploadedFile() file) {
    this.usersService.updateUserImageName(req.user.email, req.user.path);
    return { message: 'File uploaded' };
  }

  @Get('file')
  @UseGuards(JwtAuthGuard)
  async getImage(@Req() req, @Res() response: Response) {
    const imageName = await this.usersService.getUserImageName(req.user.email);
    response.sendFile(imageName, { root: process.env.UPLOAD_USER_DIR });
  }
}
