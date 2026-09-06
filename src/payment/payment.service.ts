import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { UpdatePaymentDto } from './dto/update-payment.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private paymentsRepo: Repository<Payment>,
  ) {}
  async create(createPaymentDto: CreatePaymentDto) {
    const res = await this.paymentsRepo.save(createPaymentDto);

    return res;
  }

  findAll() {
    const payment = this.paymentsRepo.find();
    return payment;
    
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const existingPayment = await this.paymentsRepo.findOneBy({ id });
    if (!existingPayment) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }
    if (updatePaymentDto.currency !== undefined) {
      existingPayment.currency = updatePaymentDto.currency;
      const updatedPayment = await this.paymentsRepo.save(existingPayment);
       return updatedPayment;
    }
    
  }

 async remove(id: number) {
    const deletedPayment = await this.paymentsRepo.delete(id);
    return deletedPayment;
    return `This action removes a #${id} payment`;
  }
}
