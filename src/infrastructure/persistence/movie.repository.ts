import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { IMovieRepository } from '../../core/interfaces/movie-repository.interface';
import { Movie } from '../../core/entities/movie.entity';

@Injectable()
export class MovieRepository implements IMovieRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly repository: Repository<Movie>,
    private readonly configService: ConfigService,
  ) {}

  findAll = async (): Promise<Movie[]> => this.repository.find();

  findByWinner = async (winner: boolean): Promise<Movie[]> =>
    this.repository.find({ where: { winner } });

  save = async (movie: Movie): Promise<Movie> => {
    const movieEntity = this.repository.create(movie);
    return this.repository.save(movieEntity);
  };

  saveMany = async (movies: Movie[]): Promise<void> => {
    const chunkSize: number = Number(
      this.configService.get<number>('CHUNK_SIZE', 100),
    );
    for (let i: number = 0; i < movies.length; i += Number(chunkSize)) {
      const chunk = movies.slice(i, i + chunkSize);
      try {
        await this.repository.upsert(chunk, ['id']); // Use 'id' or another unique field
        console.log(
          'Chunk ',
          i,
          'to',
          i + chunkSize > movies.length ? movies.length : i + chunkSize,
          ' Inserted/Updated successfully',
        );
      } catch (error) {
        console.log(
          'Error for chunk:',
          i,
          'to',
          i + chunkSize,
          'error:',
          (error as QueryFailedError).message,
        );
      }
    }
  };
}
