// src/seeds/run-leave-seed.ts
import { seedLeave } from './leave.seed';

seedLeave().catch((err) => {
  console.error('❌ Seeder failed:', err);
});
