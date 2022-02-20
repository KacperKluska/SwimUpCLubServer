import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwimmingStyle } from 'src/entities/swimming-style.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SwimmingStyle])],
  controllers: [],
  providers: [],
})
export class SwimmingStylesModule {}
