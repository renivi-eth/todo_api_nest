import { IsEnum, IsNumber, IsString, Length } from 'class-validator';
import { SortDirection } from '../variables/sort-direction';

export class TagsQueryEntity {
  @IsString()
  @Length(1, 100)
  limit?: string;

  @IsString()
  sortProperty?: string;

  @IsEnum(SortDirection)
  sortDirection?: SortDirection;
}
