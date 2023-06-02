import { IsString, MaxLength, MinLength } from "class-validator"

export class createUserDto
{
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    username: string

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string

 
    createdAt: Date

    validatePassword: string

    validateUserPassword: String


}