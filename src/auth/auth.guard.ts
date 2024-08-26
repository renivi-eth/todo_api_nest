import { AuthService } from './auth.service';
import { JsonWebTokenError } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate = async (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      throw new UnauthorizedException();
    }

    const [, token] = request.headers.authorization.split(' ');

    if (!token) {
      throw new UnauthorizedException();
    }

    return this.authService
      .validateToken(token)
      .then((decodedData) => {
        request.decodedData = decodedData;
        return true;
      })
      .catch((error) => {
        if (error instanceof JsonWebTokenError) {
          throw new UnauthorizedException('Invalid Token');
        }
        throw error;
      });
  };
}
