import { HttpException, HttpStatus } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { Request } from 'express';

export const multerServerOptions: MulterOptions = {
  limits: {
    fileSize: +process.env.MAX_FILE_SIZE || 5242880, // 5MB
  },
  fileFilter(
    req: Request,
    file: Express.Multer.File,
    done: (error: Error, acceptFile: boolean) => void,
  ) {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      done(null, true);
    } else {
      done(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    destination(
      Request: Request,
      file: Express.Multer.File,
      done: (error: Error | null, filename: string) => void,
    ) {
      const uploadPath = process.env.UPLOAD_SERVER_DIR;

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }

      done(null, uploadPath);
    },
    filename(
      req: Request,
      file: Express.Multer.File,
      done: (error: Error | null, filename: string) => void,
    ) {
      done(null, generateFileName(file.originalname, req?.user));
    },
  }),
};

function generateFileName(originalname: string, user?: Express.User) {
  const path = `${Date.now()}_${originalname}`;
  if (user) user['path'] = path;
  return path;
}
