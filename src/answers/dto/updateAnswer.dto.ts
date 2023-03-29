import { IsEnum, IsNotEmpty, IsNumber, IsString, } from "class-validator";
import { IsCorrect } from "../answer.entity";

export class UpdateAnswerDto {
  @IsString()
  @IsNotEmpty()
  isCorrect: string;
}