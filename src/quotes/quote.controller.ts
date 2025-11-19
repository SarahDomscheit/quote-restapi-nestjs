import { Controller, Get } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { Quote } from './quote.entity';

@Controller(`quotes`)
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get()
  getAllQuotes(): Quote[] {
    return this.quoteService.getAllQuotes();
  }

  @Get(`random`)
  getRandomQuotes(): Quote[] {
    return this.quoteService.getRandomQuotes();
  }
}
