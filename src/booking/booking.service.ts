import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan } from 'typeorm';
import { Booking ,BookingStatus } from './entities/booking.entity.js';
import { Doctor } from '../doctor/entities/doctor.entity.js';
import { User } from '../user/entities/user.entity.js';
import { CreateBookingDto } from './dto/create-booking.dto.js';
import { UpdateBookingDto } from './dto/update-booking.dto.js';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const { doctorId, patientId, appointmentDate } = createBookingDto;

  
    const doctor = await this.doctorRepository.findOne({ where: { id: doctorId } });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }

   
    const patient = await this.userRepository.findOne({ where: { id: patientId } });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }


    const existingBooking = await this.bookingRepository.findOne({
      where: {
        doctor: { id: doctorId },
        appointmentDate: new Date(appointmentDate),
      },
    });

    if (existingBooking) {
      throw new ConflictException('This appointment slot is already booked for this doctor.');
    }

    const patientConflict = await this.bookingRepository.findOne({
      where: {
        patient: { id: patientId },
        appointmentDate: new Date(appointmentDate),
      },
    });

    if (patientConflict) {
      throw new ConflictException('You already have another appointment booked at this exact time.');
    }

    const booking = this.bookingRepository.create({
      doctor: doctor,
      patient: patient,
      appointmentDate: new Date(appointmentDate),     
       status: BookingStatus.PENDING,
    });

    return await this.bookingRepository.save(booking);
  }

  async findAll() {
    return await this.bookingRepository.find({
      relations: {
        'doctor': true,
        'patient': true,
      },
        });
  }

  async findOne(id: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: {
        'doctor':true, 
        'patient':true,
      }
    });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    await this.findOne(id);
    await this.bookingRepository.update(id, updateBookingDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const booking = await this.findOne(id);
    return await this.bookingRepository.remove(booking);
  }
}