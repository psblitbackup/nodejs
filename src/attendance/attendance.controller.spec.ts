@Controller('attendance')
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  @Post()
  create(@Body() dto: CreateAttendanceDto) {
    return this.service.create(dto);
  }

  @Get(':employeeId/:date')
  findOne(@Param('employeeId') empId: number, @Param('date') date: string) {
    return this.service.findByEmployeeAndDate(empId, date);
  }

  @Patch(':id/checkout')
  checkout(@Param('id') id: number, @Body() body: { checkOutTime: Date }) {
    return this.service.updateCheckOut(id, body.checkOutTime);
  }

  @Patch(':id/approve')
  approve(@Param('id') id: number, @Body() body: { approvedBy: number }) {
    return this.service.approve(id, body.approvedBy);
  }
}
