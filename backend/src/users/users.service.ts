import { HttpException, Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashingServiceProtocol } from 'src/auth/hash/hash.service';
import { IncomingHttpHeaders } from 'http';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/auth/config/jwt.config';
import { type ConfigType } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly hashService: HashingServiceProtocol,
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwt: ConfigType<typeof jwtConfig>,
  ) {}

  async searchCurrentUser(headers: IncomingHttpHeaders) {
    const token = headers.authorization?.split(' ')[1];
    let userId: number;

    const payload = await this.jwtService.verifyAsync(token ?? '', this.jwt);
    userId = payload.sub;

    const userSearched = await this.prisma.users.findFirst({
      where: {
        id: Number(userId),
      },
      select: {
        id: true,
        name: true,
        email: true,
        cartItems: {
          select: {
            id: true,
            productId: true,
            quantity: true,
          },
        },
        createdAt: true,
      },
    });

    if (!userSearched)
      throw new HttpException('Nenhum usuário encontrado', 404);

    return {
      message: 'Usuário encontrado com sucesso',
      data: userSearched,
    };
  }

  async createUser(body: CreateUserDto) {
    const verifyEmailExist = await this.prisma.users.findFirst({
      where: {
        email: body.email,
      },
    });

    if (verifyEmailExist)
      throw new HttpException(
        'Já existe um usuário cadastrado com este email',
        400,
      );

    const passHash = await this.hashService.hash(body.password);

    const newUser = await this.prisma.users.create({
      data: {
        ...body,
        password: passHash,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return {
      message: 'Usuário criado com sucesso',
      data: newUser,
    };
  }

  async updateUser(id: number, body: UpdateUserDto) {
    const useToUpdate = await this.prisma.users.findFirst({
      where: {
        id: id,
      },
    });

    if (!useToUpdate) throw new HttpException('Nenhum usuário encontrado', 404);

    const userUpdated = await this.prisma.users.update({
      where: {
        id: id,
      },

      data: body,
      select: {
        id: true,
        name: true,
        email: true,
        cartItems: true,
      },
    });

    return {
      message: 'Usuário atualizado com sucesso',
      data: userUpdated,
    };
  }

  async deleteUser(id: number) {
    const userToDelete = await this.prisma.users.findFirst({
      where: {
        id: id,
      },
    });

    if (!userToDelete)
      throw new HttpException('Nenhum usuário encontrado', 404);

    await this.prisma.users.delete({
      where: {
        id: id,
      },
    });

    return {
      messagem: 'Usuário deletado com sucesso',
    };
  }
}
