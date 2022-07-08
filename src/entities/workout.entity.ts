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
  constructor(
    time: string,
    distance: number,
    workoutSession: WorkoutSession,
    workoutTypes: WorkoutTypes,
    swimmingStyle: SwimmingStyle,
    poolLength: PoolLength,
    averageSpeed: number,
    averagePace: number,
  ) {
    super();
    this.time = time;
    this.distance = distance;
    this.workoutSession = workoutSession;
    this.workoutTypes = workoutTypes;
    this.swimmingStyle = swimmingStyle;
    this.poolLength = poolLength;
    this.averageSpeed = averageSpeed;
    this.averagePace = averagePace;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'time' })
  time: string;

  @Column({ type: 'double precision' })
  distance: number;

  @Column({ type: 'double precision' })
  averageSpeed: number;

  // TODO convert it into a string (same like a time higher) or keep it as seconds and convert it to minutes and seconds on FE
  @Column({ type: 'double precision' })
  averagePace: number;

  @ManyToOne(() => WorkoutSession, (workoutSession) => workoutSession.id, {
    nullable: false,
    onDelete: 'CASCADE',
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
