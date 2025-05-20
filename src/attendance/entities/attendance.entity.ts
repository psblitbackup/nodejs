// src/attendance/entities/attendance.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

// Enum for log type
export enum AttendanceType {
  CHECKIN = 'checkin',
  CHECKOUT = 'checkout',
}

@Entity('attendances')
@Index(['employeeId', 'date', 'type'], { unique: true }) // Prevent duplicate checkin/checkout per day
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, { nullable: false })
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;

  @Column()
  employeeId: number;

  @Column({ type: 'date' })
  date: string;

  @Column()
  workingArea: string; // 'HQ', 'Ex-HQ', 'Outstation'

  @Column()
  market: string;

  @Column({ type: 'enum', enum: AttendanceType })
  type: AttendanceType;

  @Column({ type: 'timestamp' })
  time: Date;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  longitude: number;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @Column({ nullable: true, type: 'varchar' })
  selfieUrl: string;

  @Column({ nullable: true })
  workingWith: string; // TM/RM/ZM code or name

  @Column({ default: false })
  approved: boolean;

  @Column({ nullable: true })
  approvedBy: number;

  @Column({ nullable: true })
  platform: string; // Optional: 'android', 'ios', 'web'

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
