import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutSession } from 'src/entities/workout-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutSession])],
  controllers: [],
  providers: [],
})
export class WorkoutSessionsModule {}
