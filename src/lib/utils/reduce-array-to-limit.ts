import { isValidNumber } from './is-valid-number';

/**
 * @description
 * Функция, которая уменьшает массив до заданного лимита.
 *
 * Элементы массива берутся с шагом, чтобы сохранить пропорции.
 * Первый и последний элементы исходного массива всегда есть в результате.
 *
 * [1, 2, 3, 4, 5] -> [1, 3, 5]
 */
export const reduceArrayToLimit = <T>(array: T[], limit: number): T[] => {
  // Если массив уже короче или равен лимиту, то возвращаем исходный массив
  if (array.length <= limit) {
    return array;
  }

  // Если лимита нет, или он не является числом, то возвращаем пустой массив
  if (!limit || !isValidNumber(limit)) {
    return [];
  }

  // Вычисляем шаг, с которым будем брать элементы из исходного массива
  const step = (array.length - 1) / (limit - 1);

  const result: T[] = [];

  // Добавляем первый элемент
  result.push(array[0]);

  for (let i = step; result.length < limit - 1; i += step) {
    const index = Math.round(i);

    result.push(array[index]);
  }

  // Добавляем последний элемент
  result.push(array[array.length - 1]);

  return result;
};
