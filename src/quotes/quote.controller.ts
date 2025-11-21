import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { QuoteService } from './quote.service';
import { Quote } from './entities/quote.entity';
import { Public } from 'src/public/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { Roles } from 'src/public/decorators/roles.decorator';

@Controller(`quotes`)
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Public()
  @Get()
  getAllQuotes(): Promise<Quote[]> {
    return this.quoteService.getAllQuotes();
  }
  @Public()
  @Get(`random`)
  getRandomQuotes(): Promise<Quote[]> {
    return this.quoteService.getRandomQuotes();
  }

  @Public()
  @Get(`:id`)
  async getQuoteById(@Param(`id`) id: string) {
    return this.quoteService.getQuoteById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('user', 'admin')
  @Post()
  createQuote(
    @Body('author') author: string,
    @Body('quote') quote: string,
  ): Promise<Quote> {
    return this.quoteService.createQuote(author, quote);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Patch(`:id`)
  updateQuote(
    @Param(`id`) id: string,
    @Body('author') author: string,
    @Body('quote') quote: string,
  ): Promise<Quote> {
    return this.quoteService.updateQuote(id, author, quote);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Delete(`:id`)
  deleteQuote(@Param(`id`) id: string): Promise<void> {
    return this.quoteService.deleteQuote(id);
  }
}
