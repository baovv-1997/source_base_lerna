import 'dotenv/config';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { logger, stream } from './core/logger/index.logger';
import ExceptionFilter from './core/filters/exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

class App {
  public app: INestApplication;
  public port: string | number;
  public env: string;

  constructor() {
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.initApp();
  }

  private async initApp() {
    this.app = await NestFactory.create(AppModule);

    this.configApp();

    this.initAPIDocs();

    this.initializeMiddleware();

    this.filterException();

    this.filterException();

    this.listen();
  }

  private configApp() {
    this.app.enableCors();
    this.app.useGlobalPipes(new ValidationPipe());
  }

  private initAPIDocs() {
    const config = new DocumentBuilder()
      .setTitle('Pikapaka API document')
      .addBearerAuth()
      .setDescription('The API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('api-docs', this.app, document);
  }

  private filterException() {
    const { httpAdapter } = this.app.get(HttpAdapterHost);
    this.app.useGlobalFilters(new ExceptionFilter(httpAdapter));
  }

  public async listen() {
    await this.app.listen(this.port, () => {
      logger.info(`🚀 App listening on the port ${this.port}`);
    });
  }

  private initializeMiddleware() {
    if (this.env === 'production') {
      this.app.use(morgan('combined', { stream }));
    }

    if (this.env === 'development') {
      this.app.use(morgan('dev', { stream }));
    }
  }
}

new App();
