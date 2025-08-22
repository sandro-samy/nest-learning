import { IsString, MinLength, IsStrongPassword } from 'class-validator';
export class UserDto {
  @MinLength(3)
  @IsString()
  username: string;

  @IsStrongPassword()
  @MinLength(8)
  @IsString()
  password: string;
}
