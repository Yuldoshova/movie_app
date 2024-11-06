import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { UserRoles } from "src/utils/enums/user-role.enum"

export class CreateUserDto {

    @IsOptional()
    @IsString()
    firstName?: string

    @IsOptional()
    @IsString()
    lastName?: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsOptional()
    @IsEnum(UserRoles)
    role?:UserRoles
}
