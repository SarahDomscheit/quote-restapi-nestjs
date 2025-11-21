import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuoteModule } from './quotes/quote.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './quotes/entities/quote.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Users } from './users/entities/user.entity';

@Module({
  imports: [
    QuoteModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'quotes.db',
      entities: [Quote, Users],
      synchronize: true, // niemals in Produktion verwenden
      logging: false,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
