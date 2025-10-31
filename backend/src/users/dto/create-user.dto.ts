import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome do usuário não pode ser vazio' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Email do usuário não pode ser vazio' })
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'Senha do usuário não pode ser vazio' })
  @IsString()
  password: string;
}
