import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  @Column()
  quote: string;

  @Column()
  author: string;
}
