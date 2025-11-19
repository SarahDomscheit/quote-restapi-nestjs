import { Injectable, NotFoundException } from '@nestjs/common';
import { Quote } from './quote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(Quote) private quotesRepository: Repository<Quote>,
  ) {}

  async getAllQuotes(): Promise<Quote[]> {
    return this.quotesRepository.find();
  }

  async getQuoteById(id: string): Promise<Quote> {
    const found = await this.quotesRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with ID: ${id} not found!`);
    }
    return found;
  }

  async getRandomQuotes(): Promise<Quote[]> {
    return await this.quotesRepository
      .createQueryBuilder('quote')
      .orderBy('RANDOM()')
      .limit(1)
      .getMany();
  }

  async createQuote(author: string, quote: string): Promise<Quote> {
    const newQuote = this.quotesRepository.create({ author, quote });
    return await this.quotesRepository.save(newQuote);
  }

  async updateQuote(id: string, author: string, quote: string): Promise<Quote> {
    const quoteToUpdate = await this.getQuoteById(id);
    quoteToUpdate.author = author;
    quoteToUpdate.quote = quote;
    return await this.quotesRepository.save(quoteToUpdate);
  }

  async deleteQuote(id: string): Promise<void> {
    const quoteToDelete = await this.quotesRepository.delete(id);

    if (quoteToDelete.affected === 0) {
      throw new NotFoundException(`Quote with ID: ${id} not found.`);
    }
  }
}
