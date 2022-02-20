import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UsersCoaches extends BaseEntity {
  constructor(swimmer: User, coach: User) {
    super();
    this.swimmer = swimmer;
    this.coach = coach;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

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
