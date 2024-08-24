import { IsString, Length } from 'class-validator';

/**
 * DTO для входных данных на tag endpoints
 */
export class Tag_FR_RQ {
  @IsString()
  @Length(2, 30)
  name: string;
}
