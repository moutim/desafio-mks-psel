import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Repository } from 'typeorm';
import { Movie } from '../../entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const findMovie = await this.moviesRepository.findOne({
      where: { name: createMovieDto.name },
    });

    if (findMovie) {
      throw new ConflictException(
        `Movie with name ${createMovieDto.name} already exists.`,
      );
    }

    const movie = this.moviesRepository.create(createMovieDto);

    return await this.moviesRepository.save(movie);
  }

  async findAll() {
    const movies = await this.moviesRepository.find();

    if (!movies) {
      throw new NotFoundException('There are no films registered');
    }
    return movies;
  }

  async findOne(id: number) {
    const movie = await this.moviesRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found.`);
    }

    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.moviesRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found.`);
    }

    Object.assign(movie, updateMovieDto);

    return await this.moviesRepository.save(movie);
  }

  async remove(id: number) {
    const movie = await this.moviesRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException();
    }

    await this.moviesRepository.remove(movie);

    return { message: 'Movie deleted successfully.' };
  }
}
