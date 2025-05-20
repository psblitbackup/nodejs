import { Department } from '../../departments/entities/department.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('territories')
export class Territory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @ManyToOne(() => Territory, (t) => t.children, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'parent_id' })
  parent: Territory;

  @OneToMany(() => Territory, (t) => t.parent)
  children: Territory[];

  @ManyToOne(() => Department, (department) => department.territories, {
    nullable: true,
    eager: false, // optional
  })
  @JoinColumn({ name: 'departmentId' }) // 👈 This tells TypeORM to use departmentId FK
  department: Department;


  @Column({ type: 'int' })
  level: number; // 5 = MIO, ..., 1 = HOS

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  entryDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  entryBy: number;

  @Column({ nullable: true })
  depotCode: string; // Will store Depot.code
}
