import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  publishedDate: Date;

  @IsOptional()
  @IsString()
  summery: string;

  @IsNumber()
  authorId: number;
}
