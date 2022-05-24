import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwimmingStyle } from 'src/entities/swimming-style.entity';
import { SwimmingStylesService } from './swimming-styles.service';

@Module({
  imports: [TypeOrmModule.forFeature([SwimmingStyle])],
  controllers: [],
  providers: [SwimmingStylesService],
  exports: [SwimmingStylesService],
})
export class SwimmingStylesModule {}
