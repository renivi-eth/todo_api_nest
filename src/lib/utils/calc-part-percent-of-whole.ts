import { isValidNumber } from './is-valid-number';
/**
 * @description
 *
 * Функция находит процентное соотношение part к whole.
 *
 * Например, если `part = 10`, `whole = 100`, то функция вернет `10`.
 * Так как, `part` составляет `10%` от `whole`
 *
 * Если вам нужно найти change, то при вызове функции нужно вычесть `whole` из `part` в первом аргументе.
 * calcPartPercentOfWhole(part - whole, whole);
 *
 * Функция выкидывает ошибку, если переданные числа не прошли проверку `isValidNumber`
 */
export const calcPartPercentOfWhole = (part: number, whole: number, digits = 0) => {
  if (part === 0 || whole === 0) {
    return 0;
  }

  if (!isValidNumber(part) || !isValidNumber(whole) || !isValidNumber(digits)) {
    throw new Error(`calcPartPercentOfWhole get invalid parameters: part: ${part}, whole: ${whole}, digits: ${digits}`);
  }

  const result = (part / whole) * 100;
  const percentage = +result.toFixed(digits);

  if (!isValidNumber(result) || !isValidNumber(percentage)) {
    throw new Error(
      `Invalid result in calcPartPercentOfWhole: part: ${part}, whole: ${whole}, digits: ${digits}, result: ${result}, percentage: ${percentage}`,
    );
  }

  return percentage;
};
