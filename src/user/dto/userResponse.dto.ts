import { Exclude } from 'class-transformer';

export class UserResponseDto {
  username: string;
  name: string;
  email: string;
  country: string;
  @Exclude()
  password: string;
  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
