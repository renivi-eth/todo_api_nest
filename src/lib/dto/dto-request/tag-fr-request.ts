import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
/**
 * DTO для валидации входных данных для /tag (POST method)
 */
export class Tag_FR_RQ {
  @ApiProperty({ description: 'Text new name tag' })
  // Валидация name (текстовое название тэга) - тип строка, длина от 2 до 50 символов
  @IsString()
  @Length(2, 50)
  name: string;
}
