import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Injectable()
export class JwtGuard implements CanActivate {
  @Inject()
  private jwtService: JwtService;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const headers = request.header('authorization');
    try {
      const result = headers.split(' ');
      if (!result || result.length < 2) {
        throw new HttpException('token校验失败', 200);
      } else {
        const tokenInfo = this.jwtService.verify(result[1]);
        console.log(tokenInfo, 'tokenInfo');
        if (tokenInfo) {
          return true;
        } else {
          return false;
        }
      }
    } catch (e: any) {
      console.log(e.messasge, 'message');
      throw new HttpException('token校验失败', 200);
    }
  }
}
