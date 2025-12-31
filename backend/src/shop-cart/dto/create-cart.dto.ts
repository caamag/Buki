import { IsNotEmpty } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  quantity: number;
}
