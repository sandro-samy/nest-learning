import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/users.repository';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UserRepository) {}

  signup(userDto: UserDto) {
    return this.usersRepository.createUser(userDto);
  }
}
