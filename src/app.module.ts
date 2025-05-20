import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsModule } from './departments/departments.module';
import { AuthModule } from './auth/auth.module'; // ✅ Add this
import { Department } from './departments/entities/department.entity';
import { Employee } from './employees/entities/employee.entity';
import { Territory } from './territories/entities/territory.entity';
import { TerritoriesModule } from './territories/territories.module';
import { EmployeesModule } from './employees/employees.module';
import { AttendanceModule } from './attendance/attendance.module';
import { LeaveModule } from './leave/leave.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      migrations: ['dist/migrations/*.js'],
      autoLoadEntities: true,
      entities: [Department, Employee, Territory],
    }),

    DepartmentsModule,
    TerritoriesModule,
    EmployeesModule,
    AuthModule,
    AttendanceModule,
    LeaveModule,
  ],
})
export class AppModule {}
