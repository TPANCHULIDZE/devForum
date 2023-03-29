import { IsNotEmpty, IsString } from "class-validator";


export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  description: string
}