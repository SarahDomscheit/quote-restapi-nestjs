import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { QuoteService } from './quote.service';
import { Quote } from './interface/quote.entity';

@Controller(`quotes`)
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get()
  getAllQuotes(): Promise<Quote[]> {
    return this.quoteService.getAllQuotes();
  }
  @Get(`random`)
  getRandomQuotes(): Promise<Quote[]> {
    return this.quoteService.getRandomQuotes();
  }
  @Get(`:id`)
  async getQuoteById(@Param(`id`) id: string) {
    return this.quoteService.getQuoteById(id);
  }

  @Post()
  createQuote(
    @Body('author') author: string,
    @Body('quote') quote: string,
  ): Promise<Quote> {
    return this.quoteService.createQuote(author, quote);
  }

  @Patch(`:id`)
  updateQuote(
    @Param(`id`) id: string,
    @Body('author') author: string,
    @Body('quote') quote: string,
  ): Promise<Quote> {
    return this.quoteService.updateQuote(id, author, quote);
  }

  @Delete(`:id`)
  deleteQuote(@Param(`id`) id: string): Promise<void> {
    return this.quoteService.deleteQuote(id);
  }
}
