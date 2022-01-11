import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class SwimmingStyle extends BaseEntity {
  constructor(length: number) {
    super();
    this.length = length;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  length: number;
}
