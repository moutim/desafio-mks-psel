import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/services/auth/auth.service';
import { CreateLoginDto } from 'src/services/auth/dto/create-login.dto';

@ApiTags('Login')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() infoLogin: CreateLoginDto) {
    return this.authService.login(infoLogin);
  }
}
