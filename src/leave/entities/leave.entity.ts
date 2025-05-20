// src/leave/entities/leave.entity.ts
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

export type LeaveType = 'casual' | 'earned' | 'sick' | 'weekend';

@Entity('leaves')
export class Leave {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, { nullable: false })
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;

  @Column()
  employeeId: number;

  @Column({ type: 'enum', enum: ['casual', 'earned', 'sick', 'weekend'] })
  type: LeaveType;

  @Column({ type: 'date' })
  fromDate: string;

  @Column({ type: 'date' })
  toDate: string;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({ default: false })
  approved: boolean;

  @Column({ nullable: true })
  approvedBy: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
