import { Movie } from '../entities/movie.entity';

export interface IMovieRepository {
  findAll(): Promise<Movie[]>;
  findByWinner(winner: boolean): Promise<Movie[]>;
  save(movie: Movie): Promise<Movie>;
  saveMany(movies: Movie[]): Promise<void>;
}
