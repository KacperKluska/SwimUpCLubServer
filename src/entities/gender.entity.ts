import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from 'typeorm';

@Entity()
export class Gender extends BaseEntity {
  constructor(gender: string) {
    super();
    this.gender = gender;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  gender: string;
}
