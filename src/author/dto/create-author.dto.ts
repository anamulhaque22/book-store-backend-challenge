import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  bio: string;
}
