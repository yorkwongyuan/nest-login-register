import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Inject,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { type Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from '../jwt/jwt.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Inject()
  private jwtService: JwtService;
  @Post('register')
  async register(@Body(ValidationPipe) registerUserDto: RegisterUserDto) {
    return await this.userService.register(registerUserDto);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const prefix = 'Bearer ';
    const foundUser = await this.userService.login(loginUserDto);
    if (foundUser) {
      const token = this.jwtService.sign({
        id: foundUser.id,
        username: foundUser.username,
      });
      response.setHeader('token', prefix + token);
      return '登录成功';
    } else {
      return '登录失败';
    }
  }
  @UseGuards(JwtGuard)
  @Get('info')
  getInfo() {
    return 'info';
  }
}
