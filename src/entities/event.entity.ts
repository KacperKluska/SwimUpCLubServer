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
export class Event extends BaseEntity {
  constructor(
    swimmer: User,
    coach: User,
    dateStart: Date,
    dateEnd: Date,
    title: string,
  ) {
    super();
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.swimmer = swimmer;
    this.coach = coach;
    this.title = title;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'date' })
  @CreateDateColumn()
  dateStart: Date;

  @Column({ type: 'date' })
  @CreateDateColumn()
  dateEnd: Date;

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
