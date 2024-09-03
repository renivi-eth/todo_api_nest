import { BadRequestException } from '@nestjs/common';
import { Transform, TransformFnParams } from 'class-transformer';
/**
 * Трансформирует строку в number.
 */
export function TransformStringToNumber(): PropertyDecorator {
  return Transform((params: TransformFnParams) => {
    if (!params.value) {
      // данную строку не получится трансформировать в number
      return params.value;
    }

    if (Number.isFinite(+params.value)) {
      return +params.value;
    }
    throw new BadRequestException(`${params.key} can't transform to number`);
  });
}
