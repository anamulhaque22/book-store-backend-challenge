import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
import { Author } from './author/entities/author.entity';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'), // Get from .env
        port: configService.get<number>('DATABASE_PORT'), // Get from .env
        username: configService.get<string>('DATABASE_USER'), // Get from .env
        password: configService.get<string>('DATABASE_PASSWORD'), // Get from .env
        database: configService.get<string>('DATABASE_NAME'), // Get from .env
        entities: [Book, Author],
        synchronize: true, // Set to false in production
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
    BooksModule,
    AuthorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
