import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from 'src/entities/workout.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workout])],
  controllers: [],
  providers: [],
})
export class WorkoutsModule {}
