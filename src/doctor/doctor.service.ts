import { Injectable ,ConflictException, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto.js';
import { UpdateDoctorDto } from './dto/update-doctor.dto.js';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity.js';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
     private readonly doctorRepository:Repository<Doctor>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    ) {}

async create(createDoctorDto: CreateDoctorDto) {
    const { userId, specialization, consultationFee } = createDoctorDto;

    
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const doctor = this.doctorRepository.create({
      user,
      specialization,
      consultationFee,
    });

    return await this.doctorRepository.save(doctor);
  }

  async findAll() {
    return await this.doctorRepository.find({
      relations: { user: true }, 
          });
   }

  async findOne(id: number) {
    const doctor = await this.doctorRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    await this.findOne(id);
    await this.doctorRepository.update(id, updateDoctorDto);
    return this.findOne(id);
  }
  async remove(id: number) {
    const doctor = await this.findOne(id);
    return await this.doctorRepository.remove(doctor);
  }
}
