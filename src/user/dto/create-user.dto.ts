import { Matches, IsString, Length, IsNotEmpty } from 'class-validator';
export class RegisterUserDto {
  @IsString()
  @Length(2, 20)
  @IsNotEmpty()
  username: string;

  @IsString()
  @Length(6, 20)
  @Matches(/^[0-9a-zA-Z]+$/, {
    message: '密码必须是6-20位数字字母组合',
  })
  password: string;
  createDate: Date;
  updateDate: Date;
}
