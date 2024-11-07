import { IsEnum, IsObject, IsString } from "class-validator"
import { TranslateType } from "src/utils/enums/translate-type.enum"

export class CreateTranslateDto {
    @IsString()
    about: string

    @IsEnum(TranslateType)
    type: TranslateType

    @IsObject()
    definitions: Record<string, string>
}
