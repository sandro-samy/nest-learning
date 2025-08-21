import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository)
    private readonly usersRepository: UserRepository,
  ) {}
}
