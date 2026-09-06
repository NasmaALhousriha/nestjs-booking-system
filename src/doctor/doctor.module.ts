import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorService } from './doctor.service.js';
import { DoctorController } from './doctor.controller.js';
import { Doctor } from './entities/doctor.entity.js';
import { User } from '../user/entities/user.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, User])],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}