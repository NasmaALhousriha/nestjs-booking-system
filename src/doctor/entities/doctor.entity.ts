import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity.js';
import { Booking } from '../../booking/entities/booking.entity.js';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column()
  specialization: string;

  @Column()
  consultationFee: string; 
  
  @OneToMany(() => Booking, (booking) => booking.doctor)
  bookings: Booking[];
}