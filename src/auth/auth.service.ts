// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Employee } from '../employees/entities/employee.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,
    private jwtService: JwtService,
  ) {}

  async validateEmployee(code: string, password: string): Promise<Employee> {
    const user = await this.employeeRepo.findOne({ where: { code } });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid code or inactive');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Wrong password');
    }

    return user;
  }

  async login(user: Employee) {
    const payload = {
      sub: user.id,
      code: user.code,
      name: user.name,
      ffType: user.ffType,
      supervisorCode: user.supervisorCode,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }
}
