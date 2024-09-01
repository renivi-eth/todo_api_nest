import { Transform, TransformFnParams } from 'class-transformer';

// TODO:
//  Заменить типы, там где используется этот трансформер

/**
 * Трансформирует строку в number.
 *
 * Важно: необязательно получится валидное число,
 * для валидации нужно использовать class-validator.
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

    // TODO: Проверить что это работает
    throw new Error(`${params.key} can't transform to number`)
    // данную строку не получится трансформировать в number
    // return value;
  });
}
