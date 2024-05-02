import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from '../../services/register/register.service';
import { CreateRegisterDto } from '../../services/register/dto/create-register.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Register')
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  create(@Body() createRegisterDto: CreateRegisterDto) {
    return this.registerService.create(createRegisterDto);
  }
}
