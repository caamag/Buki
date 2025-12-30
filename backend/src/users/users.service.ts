import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashingServiceProtocol } from 'src/auth/hash/hash.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly hashService: HashingServiceProtocol,
  ) {}

  async searchUserById(id: number) {
    const userSearched = await this.prisma.users.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        cartItems: true,
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
