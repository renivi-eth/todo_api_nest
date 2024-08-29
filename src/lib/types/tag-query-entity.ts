import { IsEnum, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { SortDirection } from '../variables/sort-direction';

// TODO: Найминг и переработать валидацию

export class TagsQueryEntity {
  @IsString()
  @Length(1, 100)
  limit?: string;

  @IsString()
  sortProperty?: string;

  @IsEnum(SortDirection)
  sortDirection = SortDirection.ASC;
}
