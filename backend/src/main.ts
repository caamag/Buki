import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import serverless from 'serverless-http';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const isServerless = !!process.env.VERCEL;
let cachedServer: any;

async function createApp(expressApp?: any) {
  let app;

  if (expressApp) {
    app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  } else {
    app = await NestFactory.create(AppModule);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors({ origin: '*' });

  const configSwagger = new DocumentBuilder()
    .setTitle('Buki API')
    .setDescription('CRUD de produtos para o projeto Buki')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);

  if (expressApp) {
    SwaggerModule.setup('/api/swagger', expressApp, document);
  } else {
    SwaggerModule.setup('/api/swagger', app, document);
  }

  return app;
}

async function bootstrap() {
  const app = await createApp();
  await app.listen(3000);
}

export const handler = async (req, res) => {
  if (!cachedServer) {
    const expressApp = express();
    await createApp(expressApp);
    cachedServer = serverless(expressApp);
  }
  return cachedServer(req, res);
};

if (!isServerless) {
  bootstrap();
}
