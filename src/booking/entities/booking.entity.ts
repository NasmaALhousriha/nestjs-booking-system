import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity.js';
import { Doctor } from '../../doctor/entities/doctor.entity.js';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  patient: User; 

  @ManyToOne(() => Doctor, (doctor) => doctor.bookings, { onDelete: 'CASCADE' })
  doctor: Doctor; 
  @Column({ type: 'timestamp' })
  appointmentDate: Date; 

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @CreateDateColumn()
  createdAt: Date;
}