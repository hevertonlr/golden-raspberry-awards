import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './core/entities/movie.entity';
import { MovieRepository } from './infrastructure/persistence/movie.repository';
import { CsvLoaderService } from './infrastructure/csv-loader/csv-loader.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH ?? 'data/database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Movie]),
  ],
  controllers: [],
  providers: [
    {
      provide: 'IMovieRepository',
      useClass: MovieRepository,
    },
    CsvLoaderService,
  ],
})
export class AppModule {}
