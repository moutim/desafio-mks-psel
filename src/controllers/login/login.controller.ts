import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from '../../services/login/login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  create(@Body() infoLogin: any) {
    return this.loginService.login(infoLogin);
  }
}
