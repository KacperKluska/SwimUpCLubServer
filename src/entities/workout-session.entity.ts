import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class WorkoutSession extends BaseEntity {
  constructor(swimmer: User, coach: User, date: Date) {
    super();
    this.date = date;
    this.swimmer = swimmer;
    this.coach = coach;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => User, (swimmer) => swimmer.id, { nullable: false })
  @JoinColumn()
  swimmer: User;

  @ManyToOne(() => User, (coach) => coach.id, { nullable: false })
  @JoinColumn()
  coach: User;
}
