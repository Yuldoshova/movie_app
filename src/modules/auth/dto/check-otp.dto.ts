import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CheckOtpDto {
  @ApiProperty({
    type: 'number',
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'test@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'number',
    required: true,
    example: 876543,
  })
  @IsNumber()
  @IsNotEmpty()
  otp: number;
}
