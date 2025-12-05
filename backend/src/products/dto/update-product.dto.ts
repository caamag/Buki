import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateProductDto {
  @IsString({ message: 'O nome do produto não pode conter números.' })
  @IsOptional()
  name: string;

  @IsOptional()
  @IsString({ message: 'A descrição do produto não pode conter números.' })
  description: string;

  @IsOptional()
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString({ message: 'imagem inválida' })
  image: string;

  @IsOptional()
  @IsString({ message: 'O nome do autor não pode conter números.' })
  author: string;

  @IsOptional()
  @IsBoolean()
  widthStar: boolean;
}
