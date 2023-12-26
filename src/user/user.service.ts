import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { type Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/User';
import * as crypto from 'crypto';

const md5 = (str: string): string => {
  const md5 = crypto.createHash('md5');
  md5.update(str);
  return md5.digest('hex');
};

@Injectable()
export class UserService {
  @InjectRepository(User)
  // usermanager
  private repository: Repository<User>;
  async register(registerUserDto: RegisterUserDto) {
    const existUser = await this.repository.findOneBy({
      username: registerUserDto.username,
    });
    // 如果用户存在
    if (existUser) {
      throw new HttpException('该用户已经存在', HttpStatus.OK);
    }
    // 否则继续
    const user = new User();
    user.username = registerUserDto.username;
    user.password = md5(registerUserDto.password);
    try {
      await this.repository.save(user);
      return '注册成功';
    } catch (e) {
      return `注册失败, 原因: ${e.message}`;
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const username = loginUserDto.username;
    const password = loginUserDto.password;
    if (username) {
      const foundUser = await this.repository.findOneBy({
        username,
      });
      if (!foundUser) {
        throw new HttpException('用户不存在', 200);
      } else if (foundUser.password === md5(password)) {
        return foundUser;
      } else {
        throw new HttpException('密码不正确', 200);
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
