import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingService } from './booking.service.js';
import { BookingController } from './booking.controller.js';
import { Booking } from './entities/booking.entity.js';
import { User } from '../user/entities/user.entity.js';
import { Doctor } from '../doctor/entities/doctor.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, User, Doctor])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}