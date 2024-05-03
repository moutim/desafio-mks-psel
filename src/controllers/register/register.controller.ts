import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from '../../services/register/register.service';
import { CreateRegisterDto } from '../../services/register/dto/create-register.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Register')
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'MKS Desenvolvimento',
        },
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
  create(@Body() createRegisterDto: CreateRegisterDto) {
    return this.registerService.create(createRegisterDto);
  }
}
