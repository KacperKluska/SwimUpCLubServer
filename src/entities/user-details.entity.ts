import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Gender } from './gender.entity';

@Entity()
export class UserDetails extends BaseEntity {
  constructor(
    phoneNumber: string,
    photo?: string,
    age?: number,
    weight?: number,
    height?: number,
  ) {
    super();
    this.phoneNumber = phoneNumber;
    this.photo = photo;
    this.age = age;
    this.weight = weight;
    this.height = height;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 15, unique: true })
  phoneNumber: string;

  @Column({ length: 255, nullable: true, unique: true })
  photo: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true, type: 'double precision' })
  weight: number;

  @Column({ nullable: true, type: 'double precision' })
  height: number;

  @ManyToOne(() => Gender, (gender) => gender.id, { nullable: false })
  gender: Gender;
}
