import { calcPartPercentOfWhole } from '../lib/utils/calc-part-percent-of-whole';
describe('Unit test for calcPartPercentOfWhole functions', () => {
  //
  test('Результат должден возвращать правильное процентное соотношение', () => {
    // Для целых чисел
    expect(calcPartPercentOfWhole(10, 100)).toBe(10);
    // Для целых чисел
    expect(calcPartPercentOfWhole(20, 100)).toBe(20);
    // Для отрицительных чисел
    expect(calcPartPercentOfWhole(-10, 100)).toBe(-10);
  });

  test('Результат должен возвращать 0 если один из аргументов равен 0', () => {
    // Если один из аргумента функции равен 0
    expect(calcPartPercentOfWhole(0, 100)).toBe(0);

    expect(calcPartPercentOfWhole(10, 0)).toBe(0);
  });

  test('Результат должен возвращать корректное число при указании округления (digits)', () => {
    // Корректная работа округления знаков после запятой
    expect(calcPartPercentOfWhole(10, 3, 2)).toBe(333.33);

    expect(calcPartPercentOfWhole(555, 1000, 1)).toBe(55.5);
  });
});
