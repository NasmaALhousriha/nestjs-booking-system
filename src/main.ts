import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { LoggingInterceptor } from './interceptors/LoggingInterceptor.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: false, 
  });
   


  app.enableCors();

app.useGlobalInterceptors(
  new LoggingInterceptor()
);
app.useGlobalPipes( 

    new ValidationPipe({
      whitelist: true, 
      transform: true, 
    }),
  );
  
  const config = new DocumentBuilder()
    .setTitle('Nasma API Documentation')
    .setDescription('The API description for frontend developers')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  await app.listen(3000);
}
bootstrap();