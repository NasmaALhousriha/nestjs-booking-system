import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service.js';
import { BookingController } from './booking/booking.controller.js';
import { BookingService } from './booking/booking.service.js';
import { BookingModule } from './booking/booking.module.js';
import { PaymentModule } from './payment/payment.module.js';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { fileURLToPath } from 'url';
import { Payment } from './payment/entities/payment.entity.js';
import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './user/user.module.js';
import { DoctorModule } from './doctor/doctor.module.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'nest_project',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as any,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: false,
  
    }),
    BookingModule,
    PaymentModule,
    AuthModule,
    UserModule,
    DoctorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}