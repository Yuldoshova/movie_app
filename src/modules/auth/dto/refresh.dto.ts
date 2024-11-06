import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty } from 'class-validator';

export class RefreshDto {
  @ApiProperty({
    type: 'string',
    required: true,
    example: "JWT bo'lishi kerak",
  })
  @IsJWT()
  @IsNotEmpty()
  refreshToken: string;
}
