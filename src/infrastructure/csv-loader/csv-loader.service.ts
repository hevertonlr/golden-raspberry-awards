import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { MovieRepository } from '../persistence/movie.repository';
import { Movie } from '../../core/entities/movie.entity';

interface CsvRow {
  year: string;
  title: string;
  studios: string;
  producers: string;
  winner: string;
}

@Injectable()
export class CsvLoaderService implements OnModuleInit {
  constructor(
    @Inject('IMovieRepository')
    private readonly movieRepository: MovieRepository,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const csvFilePath = this.configService.get<string>('CSV_FILE_PATH');
    if (!csvFilePath)
      throw new Error('CSV_FILE_PATH environment variable is not defined');

    const movies: Movie[] = await this.loadCsv(csvFilePath);

    await this.movieRepository.saveMany(movies);
  }

  private loadCsv = async (filePath: string): Promise<Movie[]> =>
    new Promise((resolve, reject) => {
      const movies: Movie[] = [];
      fs.createReadStream(filePath)
        .pipe(csv({ separator: ';' }))
        .on('data', (data: CsvRow) => {
          movies.push({
            year: parseInt(data.year, 10),
            title: data.title,
            studios: data.studios,
            producers: data.producers,
            winner: data.winner === 'yes',
          } as Movie);
        })
        .on('end', () => resolve(movies))
        .on('error', reject);
    });
}
