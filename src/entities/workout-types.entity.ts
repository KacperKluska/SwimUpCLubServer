import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';

@Entity()
export class WorkoutTypes extends BaseEntity {
  constructor(type: string) {
    super();
    this.type = type;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  type: string;
}
