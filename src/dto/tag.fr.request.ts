import { IsEnum, IsString } from 'class-validator';

/**
 * DTO для входных данных на tag endpoints
 */
export class Tag_FR_RQ {
  @IsString()
  name: string;
}
