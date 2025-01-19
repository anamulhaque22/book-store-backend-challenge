import { Author } from 'src/author/entities/author.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  publishedDate: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  summery: string;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
}
