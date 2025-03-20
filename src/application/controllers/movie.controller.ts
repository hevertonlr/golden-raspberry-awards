import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { MovieService } from '../services/movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('producers-intervals')
  async getProducersIntervals() {
    try {
      return await this.movieService.getProducersIntervals();
    } catch {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
