import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['title', 'year'])
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  title: string;

  @Column()
  studios: string;

  @Column()
  producers: string;

  @Column()
  winner: boolean;
}
