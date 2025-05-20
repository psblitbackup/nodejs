import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  exports: [TypeOrmModule], // ✅ Required so other modules (like employee) can use Department
})
export class DepartmentsModule {}
