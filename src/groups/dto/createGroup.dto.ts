import { IsString, MinLength } from "class-validator";

export class CreateGroupDto {
  @IsString()
  @MinLength(3, {message: 'name is too short'})
  name: string
}