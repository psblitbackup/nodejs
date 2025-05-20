import {
  IsString, IsEnum, IsNotEmpty, IsDateString, IsOptional, IsNumber
} from 'class-validator';
import { AttendanceType } from '../entities/attendance.entity';

export class CreateAttendanceDto {
  @IsNotEmpty()
  @IsNumber()
  employeeId: number;

  @IsDateString()
  date: string;

  @IsEnum(AttendanceType)
  type: AttendanceType;

  @IsDateString()
  time: string;

  @IsString()
  workingArea: string;

  @IsString()
  market: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsOptional()
  @IsString()
  selfieUrl?: string;

  @IsOptional()
  @IsString()
  workingWith?: string;
}
