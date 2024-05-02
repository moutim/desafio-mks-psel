import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MoviesModule } from './modules/movies.module';
import { UsersModule } from './modules/users.module';
import { AuthModule } from './modules/auth.module';
import config from './database/config';
import { AuthMiddleware } from './middlewares/auth.middlewares';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    AuthModule,
    UsersModule,
    MoviesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/movies', method: RequestMethod.ALL },
        { path: '/users', method: RequestMethod.ALL },
      );
  }
}
