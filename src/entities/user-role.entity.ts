import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class UserRole extends BaseEntity {
  constructor(role: string) {
    super();
    this.role = role;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  role: string;
}
