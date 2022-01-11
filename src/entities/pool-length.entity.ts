import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';

@Entity()
export class PoolLength extends BaseEntity {
  constructor(length: number) {
    super();
    this.length = length;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  length: number;
}
