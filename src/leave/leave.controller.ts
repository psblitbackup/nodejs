// src/leave/leave.controller.ts
import {
  Controller, Post, Get, Query, Request, Res, Param, Patch, Header, Body, UploadedFile, UseInterceptors,UseGuards,
} from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.decorator';

@Controller('leave')
export class LeaveController {
  constructor(private readonly service: LeaveService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('upload')
  create(@Body() dto: CreateLeaveDto) {
    return this.service.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my')
  findMine(
    @Request() req,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.service.findAllByEmployee(req.user.id, from, to);
  }


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('TM', 'RM', 'ZM')
  @Get('pending')
  findPending() {
    return this.service.findAllPending();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('TM', 'RM', 'ZM')
  @Patch(':id/approve')
  approve(@Param('id') id: string, @Request() req) {
    return this.service.approve(+id, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('TM', 'RM', 'ZM')
  @Get('subordinates')
  getSubordinates(@Request() req) {
    return this.service.getSubordinates(req.user.tCode);
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('TM', 'RM', 'ZM')
  @Get('subordinate/:id')
  getSubordinateLeave(
    @Request() req,
    @Param('id') id: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.service.findLeaveForSubordinate(req.user.tCode, +id, from, to);
  }

}
