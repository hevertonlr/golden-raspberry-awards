import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/exceptions/all-exception.filter';
import { GlobalExceptionFilter } from './shared/exceptions/http-exception.filter';
import { QueryFailedErrorFilter } from './shared/exceptions/query-failed-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new GlobalExceptionFilter(),
    new QueryFailedErrorFilter(),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
