import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() userDto: UserDto) {
    return this.authService.signup(userDto);
  }

  @Post('/signin')
  signin(@Body() userDto: UserDto) {
    return this.authService.signin(userDto);
  }
}
