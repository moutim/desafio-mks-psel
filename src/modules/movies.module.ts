import { Module } from '@nestjs/common';
import { MoviesService } from '../services/movie/movies.service';
import { MoviesController } from '../controllers/movie/movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
