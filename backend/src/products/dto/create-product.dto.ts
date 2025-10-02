import { IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'O produto deve conter um nome.' })
  @IsString({ message: 'O nome do produto não pode conter números.' })
  name: string;

  @IsNotEmpty({ message: 'O produto deve conter uma descrição.' })
  @IsString({ message: 'A descrição do produto não pode conter números.' })
  description: string;

  @IsNotEmpty({ message: 'Quantidade em estoque deve ser preenchido.' })
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString({ message: 'imagem inválida' })
  image: string;

  @IsBoolean()
  widthStar: boolean;
}
