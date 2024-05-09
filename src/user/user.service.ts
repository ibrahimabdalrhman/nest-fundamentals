import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { UserResponseDto } from "./dto/userResponse.dto";

@Injectable()
export class UserService{
    private readonly users:UserEntity[]=[];

    find():UserEntity[]{
        return this.users;

    }
    findOne(username:string):UserEntity{
        const user= this.users.find(
            (user)=>user.username===username
        );        
        return user;
    }

    create(userData:CreateUserDto):UserResponseDto{
        const newuser:UserEntity={
            ...userData
        }
        this.users.push(newuser)
        return new UserResponseDto(newuser);
    }

    update(username:string,userData:UpdateUserDto):UserEntity{
        const index=this.users.findIndex((user)=>user.username===username);
        this.users[index]={...this.users[index],...userData}
        return this.users[index];
    }
    
    delete(username:string):UserEntity[]{
        const index=this.users.findIndex((user)=>user.username === username);
        this.users.splice(index,1);
        return this.users
    }

}