import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
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
  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => User, (swimmer) => swimmer.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  swimmer: User;

  @ManyToOne(() => User, (coach) => coach.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  coach: User;
}
