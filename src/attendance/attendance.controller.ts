import {
  Controller, Post, Get, Query, Request, Res, Param, Patch, Header, Body, UploadedFile, UseInterceptors,UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/guards/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { Response } from 'express';


@Controller('attendance')
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('selfie', {
    storage: diskStorage({
      destination: './uploads/attendances',
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e5)}${extname(file.originalname)}`;
        cb(null, uniqueName);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
    },
  }))

  async create(
    @Body() body: CreateAttendanceDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const selfieUrl = file ? `/uploads/attendances/${file.filename}` : undefined;
    return this.service.create({ ...body, selfieUrl });
  }


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('TM', 'RM', 'ZM')
  @Get('export')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename=attendance.xlsx')
  async export(
    @Request() req,
    @Query('from') from: string,
    @Query('to') to: string,
    @Res() res: Response,
  ) {
    // Get subordinate IDs based on role
    const subordinates = await this.service.getSubordinates(req.user.tCode);
    const subIds  = subordinates.map((e) => e.id);
    // Generate Excel workbook buffer
    const buffer = await this.service.exportToExcel(subIds, from, to);
  
    // Send it as a file download
    res.send(buffer);
  }


  //MIO: View own last 30 days or filtered attendance
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('MIO','TM', 'RM', 'ZM')
  @Get('my')
  getOwnAttendance(@Request() req, @Query('from') from: string, @Query('to') to: string) {
    const empId = req.user.id;
    // return empId;
    if (from && to) {
      return this.service.findMyAttendanceBetween(empId, from, to);
    }
    return this.service.findMyAttendance(empId);
  }

  //Supervisor: Get all subordinate employee IDs
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('TM', 'RM', 'ZM')
  @Get('subordinates')
  async getSubordinates(@Request() req) {
    const supervisorCode = req.user.code || req.user.tCode; // 👈 Provided via JWT
    return this.service.getSubordinates(supervisorCode);
  }
  // session data
  // @Get('me')
  // @UseGuards(AuthGuard('jwt'))
  // getProfile(@Request() req) {
  //   console.log('req.user:', req.user);
  //   return req.user;
  // }

  // 🔹 Supervisor: View selected subordinate's attendance
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('TM', 'RM', 'ZM')
  @Get('subordinate/:id')
  async getSubordinateAttendance(@Request() req, @Param('id') id: string) {
    const supervisorCode = req.user.code || req.user.tCode; // 👈 Provided via JWT
    const subordinateId = parseInt(id, 10);

    return this.service.findAttendanceForSubordinate(supervisorCode, subordinateId);
  }

  // 🔹 Supervisor: Approve a specific attendance record
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('TM', 'RM', 'ZM')
  @Patch(':id/approve')
  async approve(@Param('id') id: string, @Body('approvedBy') supervisorId: number) {
    return this.service.approveAttendance(+id, supervisorId);
  }
}
