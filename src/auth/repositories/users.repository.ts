import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async createUser(userDto: UserDto) {
    const { username, password } = userDto;
    const newUser = this.UserRepository.create({ username, password });

    return await this.UserRepository.save(newUser);
  }
}
