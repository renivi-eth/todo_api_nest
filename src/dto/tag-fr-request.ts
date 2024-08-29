import { IsString, Length } from 'class-validator';
/**
 * DTO для валидации входных данных для /tag
 */
export class Tag_FR_RQ {
  // Валидация name (текстовое название тэга) - тип строка, длина от 2 до 50 символов
  @IsString()
  @Length(2, 50)
  name: string;
}
