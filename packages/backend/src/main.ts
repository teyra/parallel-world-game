import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  console.log('🚀 ~ bootstrap ~ AppModule:', AppModule);
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.enableCors();
  await app.listen(process.env.PORT ?? 8000);
  console.log(
    `Server is running on port http://localhost:${process.env.PORT ?? 8000}`,
  );
}
bootstrap();
