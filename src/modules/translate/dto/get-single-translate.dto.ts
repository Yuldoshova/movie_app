import { IsNumber, IsString, IsUUID, MaxLength } from "class-validator"

export class GetSingleTranslateDto {

    @IsString()
    @MaxLength(2)
    languageCode: string

    @IsNumber()
    translateId:number
}