import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/services/auth/auth.service';
import { CreateLoginDto } from 'src/services/auth/dto/create-login.dto';

@ApiTags('Login')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'mks@email.com',
        },
        password: {
          type: 'string',
          example: 'password',
        },
      },
    },
  })
  @Post()
  create(@Body() infoLogin: CreateLoginDto) {
    return this.authService.login(infoLogin);
  }
}
