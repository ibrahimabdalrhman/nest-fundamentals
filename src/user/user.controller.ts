import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { STATUS_CODES } from "http";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserEntity } from "./user.entity";
import { ValidationPipe } from "./pipes/validation.pipe";
import { UserService } from "./user.service";
import { UserResponseDto } from "./dto/userResponse.dto";
import { AuthGuard } from "src/common/guards/auth/auth.guard";

@Controller('user')
export class UserController{
    constructor(private readonly userService:UserService){}
    @Get()
    find(  ):UserResponseDto[]{
        return this.userService.find();
    }
    @Get(":username")
    findOne(@Param("username") username:string):UserResponseDto{
              
        return this.userService.findOne(username);
    }
    @UseGuards(AuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() userData:CreateUserDto):UserResponseDto{
        
        return this.userService.create(userData);
    }
    @Patch(":username")
    update(@Body()userData:UpdateUserDto,@Param("username") username:string){
        
        return this.userService.update(username,userData);
    }
    @Delete(":username")
    delete(@Param("username") username:string){
    return this.userService.delete(username)
    }   
}
