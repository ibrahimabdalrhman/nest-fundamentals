import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from "@nestjs/common";
import { STATUS_CODES } from "http";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserEntity } from "./user.entity";
import { ValidationPipe } from "./pipes/validation.pipe";
import { UserService } from "./user.service";

@Controller('user')
export class UserController{
    constructor(private readonly userService:UserService){}
    @Get()
    find(  ):UserEntity[]{
        return this.userService.find();
    }
    @Get(":username")
    findOne(@Param("username") username:string):UserEntity{
              
        return this.userService.findOne(username);
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() userData:CreateUserDto){
        
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
