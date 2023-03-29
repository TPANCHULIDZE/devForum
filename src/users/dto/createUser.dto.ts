import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3, {
    message: 'username is too short, please use 4 charachter minimum',
  })
  @MaxLength(50, {
    message: 'username is too long, please use 50 charachter maximum',
  })
  username: string;

  @IsEmail()
  email: string;
  
  @IsString()
  @MinLength(7, {
    message: 'password is too short, please use 8 charachter minimum',
  })
  @MaxLength(50, {
    message: 'password is too long, please use 50 charachter maximum',
  })
  password: string;
}
