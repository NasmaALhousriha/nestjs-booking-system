import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service.js';
import { PaymentController } from './payment.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity.js';

@Module({
  imports:[TypeOrmModule.forFeature([Payment])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
