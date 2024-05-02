import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find();

    if (!users) {
      throw new NotFoundException('There are no registered users.');
    }

    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    delete user.password;
    return user;
  }

  async update(id: number, updateInfo: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    if (updateInfo.email) {
      const checkEmail = await this.userRepository.findOne({
        where: { email: updateInfo.email },
      });

      if (checkEmail && checkEmail.id !== user.id) {
        throw new ConflictException('User already registered with this email.');
      }
    }

    Object.assign(user, updateInfo);

    delete user.password;
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    await this.userRepository.delete(user);

    return { message: 'User deleted successfully.' };
  }
}
