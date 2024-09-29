import { isValidNumber } from '../lib/utils/is-valid-number';
// Описание для какой
describe('Unit test isValidNumber function', () => {
  // test() тоже самое что и it()
  test('Результат должен возвращать true для целых чисел в безопасном диапазоне', () => {
    // Для простого целого числа
    expect(isValidNumber(10)).toBe(true);

    // Для максимального безопасного целового числа
    expect(isValidNumber(Number.MAX_SAFE_INTEGER)).toBe(true);

    // Для минимально безопасного целого числа
    expect(isValidNumber(Number.MIN_SAFE_INTEGER)).toBe(true);
  });

  test('Результат должен возвращать false для строк', () => {
    // Для строки
    expect(isValidNumber('Just a string')).toBe(false);

    // Для строки в числах
    expect(isValidNumber('12345')).toBe(false);

    // Для строки Nan
    expect(isValidNumber('Nan')).toBe(false);

    // Для строки Infinity
    expect(isValidNumber('Infinity')).toBe(false);
  });

  test('Результат должен возвращать false для NaN', () => {
    // Для Not-a-Number
    expect(isValidNumber(NaN)).toBe(false);
  });

  test('Результат должен возвращать false для Infinity', () => {
    // Для Infinity
    expect(isValidNumber(Infinity)).toBe(false);
    expect(isValidNumber(-Infinity)).toBe(false);
  });

  test('Результата должен возвращать false если вышли за безопасный диапазон', () => {
    // Для максимального безопасного числа + 1
    expect(isValidNumber(Number.MAX_SAFE_INTEGER + 1)).toBe(false);

    // Для минимально безопасного числа - 1
    expect(isValidNumber(Number.MIN_SAFE_INTEGER - 1)).toBe(false);
  });

  test('Результат должен возвращать false для других типов данных', () => {
    expect(isValidNumber({})).toBe(false);

    expect(isValidNumber([])).toBe(false);

    expect(isValidNumber(null)).toBe(false);

    expect(isValidNumber(undefined)).toBe(false);

    expect(isValidNumber(true)).toBe(false);
  });
});
