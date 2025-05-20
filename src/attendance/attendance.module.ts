import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { Employee } from '../employees/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance,Employee])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [TypeOrmModule],
})
export class AttendanceModule {}
