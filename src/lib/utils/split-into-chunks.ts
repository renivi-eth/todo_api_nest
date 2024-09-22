/**
 * @description
 * Разбивает массив на чанки (подмассивы) заданного размера.
 * Для разбивки используется slice с шагом в size.
 * Если size не является делителем длинны массива,
 * то размер последнего чанка будет равен остатку от деления длинны target на size.
 *
 * @param target - массив для разбивки на чанки, может быть пустым
 * @param size - длинна чанка, должна быть положительным числом больше нуля. Может быть больше длинны массива
 *
 * @example
 * splitIntoChunks([1, 2, 3, 4], 2) // [[1, 2], [3, 4]]
 */
export const splitIntoChunks = <T>(target: T[], size: number): T[][] => {
  // size должен быть целым положительным числом больше нуля
  if (size <= 0 || !Number.isInteger(size)) {
    throw new Error('splitIntoChunks: Size must be a positive integer and greater than 0');
  }

  // target должен быть массивом
  if (!Array.isArray(target)) {
    throw new Error('splitIntoChunks: Target must be an array');
  }

  const chunked: T[][] = [];

  // Проходим по исходному массиву и заполняем чанки
  for (let i = 0; i < target.length; i += size) {
    const chunk: T[] = target.slice(i, i + size);
    chunked.push(chunk);
  }

  return chunked;
};
