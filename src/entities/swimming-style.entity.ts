import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class SwimmingStyle extends BaseEntity {
  constructor(style: string) {
    super();
    this.style = style;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  style: string;
}
