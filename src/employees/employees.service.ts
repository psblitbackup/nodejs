import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  // Get all employees (optional: filter by role or territory)
  async findAll(): Promise<Employee[]> {
    return this.employeeRepo.find();
  }

  // Get one employee by ID
  async findOne(id: number): Promise<Employee> {
    const emp = await this.employeeRepo.findOne({ where: { id } });
    if (!emp) throw new NotFoundException('Employee not found');
    return emp;
  }

  // Create a new employee (with supervisor ID if needed)
  async create(data: Partial<Employee>): Promise<Employee> {
    const employee = this.employeeRepo.create(data);
    return this.employeeRepo.save(employee);
  }

  // Update employee by ID
  async update(id: number, data: Partial<Employee>): Promise<Employee> {
    await this.employeeRepo.update(id, data);
    return this.findOne(id);
  }

  // Delete employee
  async remove(id: number): Promise<void> {
    await this.employeeRepo.delete(id);
  }
}
