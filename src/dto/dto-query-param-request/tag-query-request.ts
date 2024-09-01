import { IsEnum, IsOptional } from 'class-validator';
import { ToInt } from '../../lib/decorators/validate-to-int';
import { SortProperty } from 'src/lib/variables/sort-property';
import { SortDirection } from '../../lib/variables/sort-direction';

/**
 * DTO для QueryParam по тэгам - limit, sortProperty, sortDirection
 */
export class TagsQueryDTO {
  // Кастомный декоратор, проверка лимита на целое число, длина от 1 до 100
  @IsOptional()
  @ToInt()
  limit?: string;

  /// Проверка на строку, какое поле нужно сортировать - name, created_at, по дефолту по name
  @IsOptional()
  @IsEnum(SortProperty)
  sortProperty = SortProperty.NAME;

  // Проверка на ASC, DESC (по возрастанию /убыванию), направление сортировку - по возрастанию / убыванию
  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection = SortDirection.ASC;
}
