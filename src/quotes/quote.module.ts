import { Module } from '@nestjs/common';

import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';

@Module({
  controllers: [QuoteController],
  providers: [QuoteService],
  exports: [QuoteService],
  imports: [TypeOrmModule.forFeature([Quote])],
})
export class QuoteModule {}
