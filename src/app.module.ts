import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuoteModule } from './quotes/quote.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './quotes/quote.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    QuoteModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'quotes.db',
      entities: [Quote],
      synchronize: true, // niemals in Produktion verwenden
      logging: false,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
