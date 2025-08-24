import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './repositories/users.repository';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UserRepository) {}

  signup(userDto: UserDto) {
    return this.usersRepository.createUser(userDto);
  }

  async signin(userDto: UserDto) {
    const user = await this.usersRepository.findUser(userDto);

    const { password } = userDto;

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
