// src/leave/leave.service.ts
import {
  Injectable, ConflictException,ForbiddenException, NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leave } from './entities/leave.entity';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { Between } from 'typeorm';
import { Employee } from '../employees/entities/employee.entity';

@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(Leave)
    private readonly leaveRepo: Repository<Leave>,
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  async create(dto: CreateLeaveDto) {
    const overlapping = await this.leaveRepo.findOne({
      where: {
        employeeId: dto.employeeId,
        fromDate: dto.fromDate,
        toDate: dto.toDate,
      },
    });
    if (overlapping) {
      throw new ConflictException('Leave request already exists for this period.');
    }

    const leave = this.leaveRepo.create(dto);
    const saved = await this.leaveRepo.save(leave);
    return {
      message: 'Attendance request submitted successfully.',
      data: saved,
    };
  }

  async approve(id: number, approvedBy: number) {
    const leave = await this.leaveRepo.findOneBy({ id });
    if (!leave) throw new NotFoundException('Leave not found');

    leave.approved = true;
    leave.approvedBy = approvedBy;
    return this.leaveRepo.save(leave);
  }

  async findAllByEmployee(employeeId: number, from?: string, to?: string) {
    const where: any = { employeeId };
    if (from && to) {
      where.fromDate = Between(from, to);
    }
    return this.leaveRepo.find({ where, order: { fromDate: 'DESC' } });
  }


  findAllPending() {
    return this.leaveRepo.find({
      where: { approved: false },
      order: { createdAt: 'DESC' },
    });
  }

  async getSubordinates(supervisorCode: string) {
  return this.employeeRepo.find({
    where: { supervisorCode },
    select: ['id', 'code', 'name', 'ffType'],
  });
}

async findLeaveForSubordinate(supervisorCode: string, subordinateId: number, from?: string, to?: string) {
  const allowed = await this.getSubordinates(supervisorCode);
  const allowedIds = allowed.map((e) => e.id);
  if (!allowedIds.includes(subordinateId)) {
    throw new ForbiddenException('Unauthorized access to subordinate');
  }

  const where: any = { employeeId: subordinateId };
  if (from && to) {
    where.fromDate = Between(from, to);
  }

  return this.leaveRepo.find({
    where,
    order: { fromDate: 'DESC' },
  });
}
}
