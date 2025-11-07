import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email não pode estar vazio.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe uma senha!' })
  password: string;
}
