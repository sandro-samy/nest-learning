import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}
}
