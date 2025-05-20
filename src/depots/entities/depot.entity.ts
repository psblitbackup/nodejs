import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('depots')
export class Depot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;
}
