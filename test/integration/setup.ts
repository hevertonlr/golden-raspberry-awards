import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { CsvLoaderService } from '../../src/infrastructure/csv-loader/csv-loader.service';

export async function setupTestApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  const csvLoaderService =
    moduleFixture.get<CsvLoaderService>(CsvLoaderService);
  await csvLoaderService.onModuleInit();

  return app;
}
