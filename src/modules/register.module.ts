import { Module } from '@nestjs/common';
import { RegisterService } from '../services/register/register.service';
import { RegisterController } from '../controllers/register/register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
