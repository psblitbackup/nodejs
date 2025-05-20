import { DataSource } from 'typeorm';
import { Attendance } from '../attendance/entities/attendance.entity';
import { AttendanceType } from '../attendance/entities/attendance.entity'; // ✅ Import enum

export async function seedAttendance(dataSource: DataSource) {
  const repo = dataSource.getRepository(Attendance);

  await repo.insert([
    {
      employeeId: 2,
      date: '2025-05-19',
      type: AttendanceType.CHECKIN, // ✅ Use enum
      time: new Date(),
      workingArea: 'HQ',
      market: 'Gulshan',
      approved: false,
    },
    {
      employeeId: 2,
      date: '2025-05-19',
      type: AttendanceType.CHECKOUT, // ✅ Use enum
      time: new Date(),
      workingArea: 'HQ',
      market: 'Gulshan',
    },
  ]);

  console.log('✅ Attendance seeded.');
}
