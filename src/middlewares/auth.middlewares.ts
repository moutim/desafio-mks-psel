import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export class AuthMiddleware implements NestMiddleware {
  jwtService: JwtService = new JwtService();

  async use(req: any, res: any, next: (error?: any) => void) {
    let token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Access token not provided.');
    }

    if (token.includes('Bearer')) token = token.split(' ')[1];

    try {
      await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY,
      });

      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired access token.');
    }
  }
}
