import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
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

  @OneToOne(() => User)
  @JoinColumn()
  swimmer: User;

  @OneToOne(() => User)
  @JoinColumn()
  coach: User;
}
