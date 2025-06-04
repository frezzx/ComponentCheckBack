import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
  });
  console.log('porta ', 3333)

  const port = 3333;

  await app.listen(port);
  console.log(`🚀 Server running at http://localhost:${port}`);
}
bootstrap();


