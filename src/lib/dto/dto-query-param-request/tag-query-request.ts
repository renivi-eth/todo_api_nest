import { SortProperty } from 'src/lib/variables/sort-property';
import { SortDirection } from '../../variables/sort-direction';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { TransformStringToNumber } from '../../decorators/validate-to-int';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для QueryParam по тэгам - limit, sortProperty, sortDirection
 */
export class TagsQueryDTO {
  @ApiProperty({ description: 'Limit for task from 1 to 100', required: false })
  // Кастомный декоратор, проверка лимита на целое число, длина от 1 до 100
  @IsOptional()
  @TransformStringToNumber()
  @IsInt()
  @Max(100)
  @Min(1)
  limit?: number;

  @ApiProperty({ description: 'TODO', enum: ['created_at', 'name'], required: false })
  /// Проверка на строку, какое поле нужно сортировать - name, created_at, по дефолту по name
  @IsOptional()
  @IsEnum(SortProperty)
  sortProperty = SortProperty.NAME;

  @ApiProperty({ description: 'TODO', enum: ['ASC', 'DESC'], required: false })
  // Проверка на ASC, DESC (по возрастанию / убыванию), направление сортировку - по возрастанию / убыванию
  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection = SortDirection.ASC;
}
