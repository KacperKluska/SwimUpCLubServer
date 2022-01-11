import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { WorkoutSession } from './workout-session.entity';

@Entity()
export class Note extends BaseEntity {
  constructor(note: string, workoutSession: WorkoutSession) {
    super();
    this.note = note;
    this.workoutSession = workoutSession;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  note: string;

  @ManyToOne(() => WorkoutSession, (workoutSession) => workoutSession.id, {
    nullable: false,
  })
  workoutSession: WorkoutSession;
}
