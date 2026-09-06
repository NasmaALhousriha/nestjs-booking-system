import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export class CreateBookingDto {
  @IsNumber()
  @IsNotEmpty()
  doctorId: number;

  @IsNumber()
  @IsNotEmpty()
  patientId: number;

  @IsDateString()
  @IsNotEmpty()
  @Transform(({ value }) => {
    const bookingDate = new Date(value);
    const now = new Date();
    
    if (bookingDate <= now) {
      throw new BadRequestException('Cannot book an appointment in the past.');
    }

    const maxDate = new Date();
    maxDate.setDate(now.getDate() + 30);

    if (bookingDate > maxDate) {
      throw new BadRequestException('Appointments can only be booked up to one month in advance.');
    }
    
    const hours = bookingDate.getHours();
    if (hours < 9 || hours >= 17) {
      throw new BadRequestException('Appointments can only be booked during working hours (between 9:00 AM and 5:00 PM).');
    }
    return value;
  })
  appointmentDate: string;
}