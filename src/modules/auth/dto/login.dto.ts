import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {

    @ApiProperty({
        type: "string",
        required: true,
        example: "johndoe@gmail.com"
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
