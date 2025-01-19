import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorResponseDto } from './dto/author-response.dto';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private readonly authorRepo: Repository<Author>,
  ) {}

  async create(author: CreateAuthorDto): Promise<AuthorResponseDto> {
    const newAuthor = await this.authorRepo.save(
      this.authorRepo.create({
        ...author,
      }),
    );

    const response = new AuthorResponseDto();
    response.id = newAuthor.id;
    response.name = newAuthor.name;
    response.bio = newAuthor.bio;
    return response;
  }

  async findAll(): Promise<AuthorResponseDto[]> {
    const authors = await this.authorRepo.find();
    return authors.map((author) => {
      const response = new AuthorResponseDto();
      response.id = author.id;
      response.name = author.name;
      response.bio = author.bio;
      return response;
    });
  }

  async findById(id: number): Promise<Author> {
    const author = await this.authorRepo.findOne({
      where: { id },
    });
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    return author;
  }

  async update(
    id: number,
    authorData: UpdateAuthorDto,
  ): Promise<Pick<Author, 'id' | 'name' | 'bio'>> {
    const author = await this.findById(id);
    const udpatedAuthor = await this.authorRepo.save({
      ...author,
      ...authorData,
    });
    return {
      id: udpatedAuthor.id,
      name: udpatedAuthor.name,
      bio: udpatedAuthor.bio,
    };
  }

  async remove(id: number): Promise<void> {
    const author = await this.findById(id);
    await this.authorRepo.remove(author);
  }
}
