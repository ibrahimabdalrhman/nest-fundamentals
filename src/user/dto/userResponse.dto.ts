import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  username: string;
  name: string;
  email: string;
  @Expose({name:'Country'})
  country: string;
  @Exclude()
  password: string;
  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
