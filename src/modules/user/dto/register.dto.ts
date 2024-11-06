import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'johndoe@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: 'John',
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({
    type: 'string',
    required: false,
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  lastName: string;
}
