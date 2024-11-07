import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateLanguageDto {
    @IsString()
    @IsNotEmpty()
    code: string

    @IsString()
    @IsNotEmpty()
    title: string

    @IsOptional()
    image: any
}
