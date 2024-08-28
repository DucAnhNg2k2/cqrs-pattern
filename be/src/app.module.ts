import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './module/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from './config/database';
import { ProductEntity } from './module/product/command/product.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { QueueModule } from './module/queue/queue.module';
import queue from './config/queue';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', load: [database, queue] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: +configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [ProductEntity],
        // synchronize: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('database.mongoUri'),
      }),
      inject: [ConfigService],
    }),
    QueueModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        host: configService.get('queue.host'),
        port: +configService.get('queue.port'),
        user: configService.get('queue.user'),
        password: configService.get('queue.password'),
      }),
      inject: [ConfigService],
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
