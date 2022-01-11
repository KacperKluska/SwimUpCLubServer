import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Column,
} from 'typeorm';
import { WorkoutSession } from './workout-session.entity';

@Entity()
export class Workout extends BaseEntity {
  constructor(time: string, distance: number, workoutSession: WorkoutSession) {
    super();
    this.time = time;
    this.distance = distance;
    this.workoutSession = workoutSession;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'time' })
  time: string;

  @Column({ type: 'double precision' })
  distance: number;

  @Column({ type: 'double precision' })
  averageSpeed: number;

  @Column({ type: 'double precision' })
  averagePace: number;

  @ManyToOne(() => WorkoutSession, (workoutSession) => workoutSession.id, {
    nullable: false,
  })
  workoutSession: WorkoutSession;
}
