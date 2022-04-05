import { IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  password: string;

  createTime: Date;

  updateTime: Date;
}
