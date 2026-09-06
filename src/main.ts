import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: false, // لإيقاف رسائل التحليلات المزعجة
  });

  // تفعيل الـ CORS لربط الفرونت إند بسلاسة
  app.enableCors();

  // إعدادات التوثيق (Swagger)
  const config = new DocumentBuilder()
    .setTitle('Nasma API Documentation')
    .setDescription('The API description for frontend developers')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // الرابط سيكون /api

  await app.listen(3000);
}
bootstrap();