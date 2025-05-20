import { DataSource } from 'typeorm';
import { seedAttendance } from './attendance.seed';
import dataSource from '../../data-source'; // adjust if your data-source file path is different

dataSource.initialize().then(async () => {
  console.log('🔄 Running Attendance Seeder...');
  await seedAttendance(dataSource);
  await dataSource.destroy();
  console.log('✅ Done.');
}).catch((err) => {
  console.error('❌ Seeder failed:', err);
});
