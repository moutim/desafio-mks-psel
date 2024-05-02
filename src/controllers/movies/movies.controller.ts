import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MoviesService } from '../../services/movie/movies.service';
import { CreateMovieDto } from '../../services/movie/dto/create-movie.dto';
import { UpdateMovieDto } from '../../services/movie/dto/update-movie.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Pulp Fiction',
        },
        genre: {
          type: 'string',
          example: 'Action',
        },
        director: {
          type: 'string',
          example: 'Quentin Tarantino',
        },
        year: {
          type: 'number',
          example: 1995,
        },
      },
    },
  })
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Pulp Fiction',
        },
        genre: {
          type: 'string',
          example: 'Action',
        },
        director: {
          type: 'string',
          example: 'Quentin Tarantino',
        },
        year: {
          type: 'number',
          example: 1995,
        },
      },
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
