import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [],
  controllers: [UploadsController],
})
export class UploadsModule {}
