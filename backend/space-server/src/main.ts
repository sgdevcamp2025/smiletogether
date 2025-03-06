import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './common/PrismaExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://smiletogether.store',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  app.useGlobalFilters(new PrismaExceptionFilter());
  await app.listen(process.env.PORT ?? 8090);
}
bootstrap();
