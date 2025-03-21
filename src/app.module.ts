import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './core/entities/movie.entity';
import { MovieRepository } from './infrastructure/persistence/movie.repository';
import { CsvLoaderService } from './infrastructure/csv-loader/csv-loader.service';
import { MovieService } from './application/services/movie.service';
import { MovieController } from './application/controllers/movie.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Movie]),
  ],
  controllers: [MovieController],
  providers: [
    {
      provide: 'IMovieRepository',
      useClass: MovieRepository,
    },
    CsvLoaderService,
    MovieService,
  ],
})
export class AppModule {}
