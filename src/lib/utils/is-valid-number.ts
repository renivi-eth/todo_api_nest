/**
 * @description
 * Функция проверяет, что значение является числом
 * Если переданное число является строкой, то пытается преобразовать в число
 *
 * Число не должно быть NaN, Infinity и -Infinity
 * Число должно быть в безопасном диапазоне MIN_SAFE_INTEGER и MAX_SAFE_INTEGER
 *
 * Более подробно можно посмотреть в тестах к функции
 */
export const isValidNumber = (value: unknown): value is number => {
  // Проверяем, что значение является реальным числом
  if (typeof value !== 'number') {
    return false;
  }

  // Проверяем, что число не является NaN
  if (isNaN(value)) {
    return false;
  }

  // Проверяем, что число не является Infinity/-Infinity
  if (!Number.isFinite(value)) {
    return false;
  }

  /**
   * Тут самое сложное:
   * Нужно проверить что число является безопасным числом isSafeInteger
   * Но при этом нужно учитывать, что isSafeInteger для числа с плавающей точкой вернет false
   *
   * Поэтому мы округляем число до целого и проверяем, что оно безопасное
   *
   * Нужно округлить в обе стороны, чтобы учесть MIN_SAFE_INTEGER и MAX_SAFE_INTEGER
   */
  if (!Number.isSafeInteger(Math.ceil(value)) && !Number.isSafeInteger(Math.floor(value))) {
    return false;
  }

  return true;
};
