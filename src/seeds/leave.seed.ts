// src/seeds/leave.seed.ts
import { DataSource, DeepPartial } from 'typeorm';
import { Leave, LeaveType } from '../leave/entities/leave.entity';
import { Employee } from '../employees/entities/employee.entity';
import dataSource from '../../data-source';
// export enum LeaveType {
//   CASUAL = 'Casual',
//   EARNED = 'Earned',
//   SICK = 'Sick',
//   WEEKEND = 'Weekend',
// }

export async function seedLeave() {
  await dataSource.initialize();

  const leaveRepo = dataSource.getRepository(Leave);
  const employeeRepo = dataSource.getRepository(Employee);

  const employee = await employeeRepo.findOneBy({ id: 2 });
  if (!employee) {
    console.error('❌ Employee ID 2 not found. Cannot seed leave.');
    return;
  }

  const leaveEntries: DeepPartial<Leave>[] = [
    {
      employeeId: 3,
      type: 'casual',
      fromDate: '2025-05-23',
      toDate: '2025-05-23',
      reason: 'Personal tasks',
      approved: false,
    },
    {
      employeeId: 4,
      type: 'sick',
      fromDate: '2025-05-24',
      toDate: '2025-05-24',
      reason: 'Fever',
      approved: true,
      approvedBy: 3,
    },
    {
      employeeId: 2,
      type: 'earned',
      fromDate: '2025-05-26',
      toDate: '2025-05-27',
      approved: false,
    },
  ];

  const created = leaveRepo.create(leaveEntries); // ✅ Now correctly typed
  await leaveRepo.save(created);

  console.log('✅ Leave seeding completed.');
  await dataSource.destroy();
}
