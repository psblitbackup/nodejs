import {
  Injectable, ConflictException,ForbiddenException, NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Between, MoreThanOrEqual } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import * as ExcelJS from 'exceljs';
import { Employee } from '../employees/entities/employee.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepo: Repository<Attendance>,
    @InjectRepository(Employee) // ✅ inject Employee repo
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  async create(dto: CreateAttendanceDto) {
    const exists = await this.attendanceRepo.findOne({
      where: {
        employeeId: dto.employeeId,
        date: dto.date,
        type: dto.type,
      },
    });
    if (exists) {
      throw new ConflictException(`Already ${dto.type}ed for this date.`);
    }

    const attendance = this.attendanceRepo.create(dto);
    const saved = await this.attendanceRepo.save(attendance);
    return {
      message: 'Attendance request submitted successfully.',
      data: saved,
    };
  }

  async findAllByEmployee(employeeId: number) {
    return this.attendanceRepo.find({ where: { employeeId } });
  }


  async exportToExcel(employeeIds: number[], from: string, to: string): Promise<Buffer> {
    const records = await this.attendanceRepo.find({
      where: {
        employeeId: In(employeeIds),
        date: Between(from, to),
      },
      order: { date: 'DESC' },
    });
  
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Attendance');
  
    sheet.columns = [
      { header: 'Employee ID', key: 'employeeId' },
      { header: 'Date', key: 'date' },
      { header: 'Type', key: 'type' },
      { header: 'Market', key: 'market' },
      { header: 'Remarks', key: 'remarks' },
    ];
  
    records.forEach(row => sheet.addRow(row));
    return Buffer.from(await workbook.xlsx.writeBuffer());

  }


  // Return last 30 days of attendance for logged-in MIO
  async findMyAttendance(employeeId: number) {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return this.attendanceRepo.find({
      where: { employeeId, date: MoreThanOrEqual(date.toISOString().split('T')[0]) },
      order: { date: 'DESC' },
    });
  }

  // Return filtered attendance (from - to) for MIO
  async findMyAttendanceBetween(employeeId: number, from: string, to: string) {
    return this.attendanceRepo.find({
      where: { employeeId, date: Between(from, to) },
      order: { date: 'DESC' },
    });
  }


  // src/attendance/attendance.service.ts
  async getSubordinates(supervisorCode: string) {
    return this.employeeRepo.find({
      where: { supervisorCode },
      select: ['id', 'code', 'hrCode', 'name', 'ffType', 'supervisorCode'],
   });
  }

  //Find subordinate’s attendance (with access control)
  async findAttendanceForSubordinate(supervisorCode: string, subordinateId: number) {
    const subordinates = await this.getSubordinates(supervisorCode);
    const allowedIds = subordinates.map((e) => e.id); // 🛠 extract IDs only
    if (!allowedIds.includes(subordinateId)) {
      throw new ForbiddenException('Unauthorized access to subordinate');
    }
    return this.attendanceRepo.find({
      where: { employeeId: subordinateId },
      order: { date: 'DESC' },
    });
  }


  //Approve a specific attendance entry
  async approveAttendance(id: number, approverId: number) {
    const record = await this.attendanceRepo.findOneBy({ id });
    if (!record) throw new NotFoundException('Attendance not found');
    record.approved = true;
    record.approvedBy = approverId;
    return this.attendanceRepo.save(record);
  }
}
