import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity()
export class User extends BaseEntity {
  constructor(name: string, surname: string, email: string, password: string) {
    super();
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  surname: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @OneToOne(() => UserRole)
  @JoinColumn()
  userRole: UserRole;
}
