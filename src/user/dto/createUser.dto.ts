import { IsEmail, IsOptional, IsString, Length, isString } from "class-validator";


export class CreateUserDto {
    @IsString()
    name: string;
    @IsString()
    @Length(3, 30,{message:"incorrect length "})
    username: string;
    @IsEmail()
    email: string;
    @IsString()
    password:string;
    @IsOptional()
    @IsString()
    country: string; // Making country required
}
