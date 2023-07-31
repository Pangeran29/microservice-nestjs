import { BadRequestException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    await this.validateCreateUser(email);

    return await this.userRepository.create({
      email,
      password: await bcrypt.hash(password, 10)
    });
  }

  async validateCreateUser(email: string) {
    try {
      await this.userRepository.findOne({ email });
    } catch (error) {
      return;
    }

    throw new UnprocessableEntityException('Email already exist');
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({email});

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException();
    }

    return user;
  }

  async getUser(getUserDto: GetUserDto) {
     return await this.userRepository.findOne(getUserDto);
  }
}
