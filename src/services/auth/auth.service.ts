import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async login(info: any) {
    const user = await this.userRepository.findOne({
      where: { email: info.email, password: info.passwords },
    });

    if (!user) {
      throw new NotFoundException({
        message: 'Incorrect username or password.',
      });
    }

    const payload = { email: user.email, id: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
