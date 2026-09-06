import { PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto.js';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
    id: number;
    currency?:string|undefined;
    amount?: number | undefined;
}
