import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

import { Attendance } from './src/attendance/entities/attendance.entity';
import { Leave } from './src/leave/entities/leave.entity';
import { Employee } from './src/employees/entities/employee.entity';
import { Department } from './src/departments/entities/department.entity';
import { Territory } from './src/territories/entities/territory.entity';

const isDev = process.env.NODE_ENV !== 'production';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  migrations: ['dist/migrations/*.js'],
  entities: isDev
    ? [Attendance,Leave,Employee,Department,Territory]
    : ['dist/**/*.entity.js'],
});

