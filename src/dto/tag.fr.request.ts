import { IsString, Length } from 'class-validator';
/**
 * DTO для входных данных для /tag
 */
export class Tag_FR_RQ {
  @IsString()
  @Length(2, 50)
  name: string;
}
