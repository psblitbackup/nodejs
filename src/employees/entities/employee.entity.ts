// src/employees/entities/employee.entity.ts
import { Department } from '../../departments/entities/department.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  hrCode: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  depotCode: string;

  @Column()
  password: string;

  @ManyToOne(() => Department, (department) => department.employees, {
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  ffType: string;

  @Column({ nullable: true, type: 'text' })
  districts: string;

  @Column({ nullable: true, type: 'text' })
  thanas: string;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  targetShare: number;

  @Column({ nullable: true })
  group: string;

  @Column({ nullable: true })
  mhname: string;

  @Column({ type: 'date', nullable: true })
  beginningDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ default: false })
  approved: boolean;

  @Column({ nullable: true })
  role: string; // MIO, TM, etc.

  @Column({ nullable: true })
  supervisorCode: string;
}
