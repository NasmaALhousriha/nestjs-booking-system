export interface PaymentCurrency {
    currency: string;
    amount: number;
}

export class CreatePaymentDto implements PaymentCurrency {
    currency: string;
    amount: number;
}
