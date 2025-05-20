// src/leave/dto/update-leave.dto.ts
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateLeaveDto {
  @IsOptional() @IsBoolean()
  approved?: boolean;

  @IsOptional() @IsNumber()
  approvedBy?: number;
}
