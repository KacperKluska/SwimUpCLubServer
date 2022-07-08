import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from 'src/entities/workout.entity';
import { PoolLengthsModule } from 'src/pool-lengths/pool-lengths.module';
import { SwimmingStylesModule } from 'src/swimming-styles/swimming-styles.module';
import { WorkoutSessionsModule } from 'src/workout-sessions/workout-sessions.module';
import { WorkoutTypesModule } from 'src/workout-types/workout-types.module';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workout]),
    SwimmingStylesModule,
    PoolLengthsModule,
    WorkoutTypesModule,
    WorkoutSessionsModule,
  ],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
})
export class WorkoutsModule {}
