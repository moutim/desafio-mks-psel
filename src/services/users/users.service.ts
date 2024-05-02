import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const checkUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (checkUser) {
      throw new ConflictException('Usuário já cadastrado com este email.');
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

  async findAll() {
    const users = await this.userRepository.find();

    if (!users) {
      throw new NotFoundException('Não há usuários cadastrados.');
    }

    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
    }

    delete user.password;
    return user;
  }

  async update(id: number, updateInfo: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
    }

    if (updateInfo.email) {
      const checkEmail = await this.userRepository.findOne({
        where: { email: updateInfo.email },
      });

      if (checkEmail && checkEmail.id !== user.id) {
        throw new ConflictException('Usuário já cadastrado com este email.');
      }
    }

    Object.assign(user, updateInfo);

    delete user.password;
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
    }

    await this.userRepository.delete(user);

    return { message: 'Usuário deletado com sucesso.' };
  }
}
