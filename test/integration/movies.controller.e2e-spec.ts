import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MovieService } from '../../src/application/services/movie.service';
import { MovieController } from '../../src/application/controllers/movie.controller';
import { App } from 'supertest/types';

describe('MovieController (e2e)', () => {
  let app: INestApplication<App>;
  let movieService: MovieService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: {
            getProducersIntervals: jest.fn(),
          },
        },
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    movieService = moduleFixture.get<MovieService>(MovieService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /movies/producers-intervals', () => {
    it('should return producer intervals', async () => {
      const mockResult = {
        min: [
          {
            producer: 'Producer 1',
            interval: 1,
            previousWin: 2008,
            followingWin: 2009,
          },
        ],
        max: [
          {
            producer: 'Producer 2',
            interval: 99,
            previousWin: 1900,
            followingWin: 1999,
          },
        ],
      };

      const getProducersIntervalsSpy = jest
        .spyOn(movieService, 'getProducersIntervals')
        .mockResolvedValue(mockResult);

      const response = await request(app.getHttpServer())
        .get('/movies/producers-intervals')
        .expect(200);

      expect(response.body).toEqual(mockResult);
      expect(getProducersIntervalsSpy).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      jest
        .spyOn(movieService, 'getProducersIntervals')
        .mockRejectedValue(new Error('Internal Server Error'));

      const response = await request(app.getHttpServer())
        .get('/movies/producers-intervals')
        .expect(500);

      expect(response.body).toEqual({
        statusCode: 500,
        message: 'Internal Server Error',
      });
    });
  });
});
