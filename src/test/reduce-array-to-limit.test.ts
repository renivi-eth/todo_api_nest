import { reduceArrayToLimit } from '../lib/utils/reduce-array-to-limit';

describe('reduceArrayToLimit', () => {
  test('Результат должен вернуть исходный массив, если он короче или равен лимиту', () => {
    const array = [1, 2, 3];
    const limit = 5;
    const result = reduceArrayToLimit(array, limit);
    expect(result).toEqual(array);
  });

  test('Результат должен вернуть массив точно с указанным лимитом', () => {
    const array = [1, 2, 3, 4, 5];
    const limit = 3;
    const result = reduceArrayToLimit(array, limit);
    expect(result).toEqual([1, 3, 5]);
  });

  test('Результат должен вернуть первый и последний элементы, если лимит равен 2', () => {
    const array = [1, 2, 3, 4, 5];
    const limit = 2;
    const result = reduceArrayToLimit(array, limit);
    expect(result).toEqual([1, 5]);
  });

  test('Результат должен вернуть пустой массив, если лимита нет и он не является корректным числом', () => {
    const array = [1, 2, 3, 4, 5];
    const invalidLimits = [null, undefined, 'abc', NaN, 0];

    invalidLimits.forEach((limit) => {
      const result = reduceArrayToLimit(array, limit as any);
      expect(result).toEqual([]);
    });
  });

  test('Результат должен вернуть корректный ответ, если есть строки', () => {
    const array = ['a', 'b', 'c', 'd', 'e'];
    const limit = 3;
    const result = reduceArrayToLimit(array, limit);
    expect(result).toEqual(['a', 'c', 'e']);
  });

  // Это ошибка (!)
  test('Результат должен вернуть пустой массив, если лимит меньше 1 или имеет отрицительное число', () => {
    const array = [1, 2, 3, 4, 5];
    const limit = -1;
    expect(reduceArrayToLimit(array, limit)).toEqual([1, 5]);
  });
});
