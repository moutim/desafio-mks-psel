import { Module } from '@nestjs/common';
import { UsersService } from '../services/users/users.service';
import { UsersController } from '../controllers/users/users.controller';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
