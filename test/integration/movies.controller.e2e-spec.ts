import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MovieService } from '../../src/application/services/movie.service';
import { App } from 'supertest/types';
import { AppModule } from '../../src/app.module';

describe('MovieController (e2e)', () => {
  let app: INestApplication<App>;
  let movieService: MovieService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
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
    it('should return producer intervals', () => {
      request(app.getHttpServer())
        .get('/movies/producers-intervals')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('min');
          expect(res.body).toHaveProperty('max');
        });
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
