// src/leave/leave.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leave } from './entities/leave.entity';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { Employee } from '../employees/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Leave,Employee])],
  providers: [LeaveService],
  controllers: [LeaveController],
})
export class LeaveModule {}
