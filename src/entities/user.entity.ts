import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserDetails } from './user-details.entity';
import { UserRole } from './user-role.entity';

@Entity()
export class User extends BaseEntity {
  constructor(
    name: string,
    surname: string,
    email: string,
    password: string,
    userRole: UserRole,
  ) {
    super();
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.userRole = userRole;
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

  @ManyToOne(() => UserRole, (userRole) => userRole.id, { nullable: false })
  @JoinColumn()
  userRole: UserRole;

  @OneToOne(() => UserDetails)
  userDetails: UserDetails;
}
