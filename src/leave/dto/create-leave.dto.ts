// src/leave/dto/create-leave.dto.ts
import { IsEnum, IsNotEmpty, IsDateString, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateLeaveDto {
  @IsNotEmpty() @IsNumber()
  employeeId: number;

  @IsNotEmpty() @IsEnum(['casual', 'earned', 'sick', 'weekend'])
  type: 'casual' | 'earned' | 'sick' | 'weekend';

  @IsNotEmpty() @IsDateString()
  fromDate: string;

  @IsNotEmpty() @IsDateString()
  toDate: string;

  @IsOptional() @IsString()
  reason?: string;
}
