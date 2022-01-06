import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from 'typeorm';

@Entity()
export class UserDetails extends BaseEntity {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn('uuid')
  id: number;

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
}
