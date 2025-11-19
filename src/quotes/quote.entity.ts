import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  quote: string;

  @Column()
  author: string;
}
