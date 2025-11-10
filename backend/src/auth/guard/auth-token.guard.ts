import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  Inject,
} from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwt: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenHeader(request);

    if (!token) throw new HttpException('Token not found', 403);

    try {
      await this.jwtService.verifyAsync(token, this.jwt);
    } catch (error) {
      throw new HttpException('Anauthorized', 403);
    }

    return true;
  }

  extractTokenHeader(request: Request) {
    const authorization = request.headers.authorization;

    if (!authorization || typeof authorization !== 'string') {
      return;
    }

    return authorization.split(' ')[1];
  }
}
