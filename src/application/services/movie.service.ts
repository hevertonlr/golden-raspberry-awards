import { Inject, Injectable } from '@nestjs/common';
import { Movie } from '../../core/entities/movie.entity';
import { IMovieRepository } from '../../core/interfaces/movie-repository.interface';

export interface ProducerInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}
@Injectable()
export class MovieService {
  constructor(
    @Inject('IMovieRepository')
    private readonly movieRepository: IMovieRepository,
  ) {}

  async getProducersIntervals() {
    const winningMovies = await this.getWinningMovies();
    const producersMap = this.groupMoviesByProducer(winningMovies);
    const intervals = this.calculateIntervals(producersMap);

    return {
      min: this.findMinInterval(intervals),
      max: this.findMaxInterval(intervals),
    };
  }

  private async getWinningMovies(): Promise<Movie[]> {
    const movies = await this.movieRepository.findAll();
    return movies.filter((movie) => movie.winner);
  }

  private groupMoviesByProducer(movies: Movie[]): { [key: string]: Movie[] } {
    const producerMovies: { [key: string]: Movie[] } = {};

    movies.forEach((movie) => {
      movie.producers
        .split(/ and |, /)
        .map((producer) => producer.trim())
        .forEach((producer) => {
          if (!producerMovies[producer]) producerMovies[producer] = [];
          producerMovies[producer].push(movie);
        });
    });

    return producerMovies;
  }

  private calculateIntervals(producerMovies: {
    [key: string]: Movie[];
  }): ProducerInterval[] {
    const intervals: ProducerInterval[] = [];

    for (const producer in producerMovies) {
      const movies = producerMovies[producer].sort((a, b) => a.year - b.year);

      for (let i = 1; i < movies.length; i++) {
        intervals.push({
          producer,
          interval: movies[i].year - movies[i - 1].year,
          previousWin: movies[i - 1].year,
          followingWin: movies[i].year,
        });
      }
    }

    return intervals;
  }

  private findMinInterval(intervals: ProducerInterval[]): ProducerInterval[] {
    const min = Math.min(...intervals.map((item) => item.interval));
    return intervals.filter((item) => item.interval === min);
  }

  private findMaxInterval(intervals: ProducerInterval[]): ProducerInterval[] {
    const max = Math.max(...intervals.map((item) => item.interval));
    return intervals.filter((item) => item.interval === max);
  }
}
