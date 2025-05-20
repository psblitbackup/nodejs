// src/departments/entities/department.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { BaseAuditEntity } from '../../common/entities/base-audit.entity';
import { Territory } from '../../territories/entities/territory.entity';

@Entity('departments')
export class Department extends BaseAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];

  @OneToMany(() => Territory, (territory) => territory.department)
  territories: Territory[];
}
