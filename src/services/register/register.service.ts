import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { hash } from 'bcryptjs';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateRegisterDto) {
    const checkUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (checkUser) {
      throw new ConflictException('User already registered with this email.');
    }

    const encodedPassword = await hash(createUserDto.password, 8);

    const user = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: encodedPassword,
    };

    const userCreated = await this.userRepository.save(user);

    delete userCreated.password;
    return userCreated;
  }
}
