import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDoctorDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  specialization: string;

  @IsString()
  @IsNotEmpty()
  consultationFee: string;
}