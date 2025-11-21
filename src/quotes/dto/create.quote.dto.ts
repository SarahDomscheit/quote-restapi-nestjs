import { Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

export class QuoteResponseDto {
  @IsUUID()
  @Expose()
  id: string;

  @IsString()
  @Expose()
  quote: string;

  @IsString()
  @Expose()
  author: string;
}
