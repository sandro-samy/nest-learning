import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async createUser(userDto: UserDto) {
    const { username, password } = userDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.UserRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      return await this.UserRepository.save(newUser);
    } catch (error: unknown) {
      if ((error as { code: string }).code === '23505') {
        throw new ConflictException('username already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findUser({ username }: UserDto) {
    const user = await this.UserRepository.findOne({ where: { username } });
    return user;
  }
}
