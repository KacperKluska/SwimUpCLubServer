import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Column,
} from 'typeorm';
import { PoolLength } from './pool-length.entity';
import { SwimmingStyle } from './swimming-style.entity';
import { WorkoutSession } from './workout-session.entity';
import { WorkoutTypes } from './workout-types.entity';

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

  @ManyToOne(() => WorkoutTypes, (workoutTypes) => workoutTypes.id, {
    nullable: false,
  })
  workoutTypes: WorkoutTypes;

  @ManyToOne(() => SwimmingStyle, (swimmingStyle) => swimmingStyle.id, {
    nullable: false,
  })
  swimmingStyle: SwimmingStyle;

  @ManyToOne(() => PoolLength, (poolLength) => poolLength.id, {
    nullable: false,
  })
  poolLength: PoolLength;
}
