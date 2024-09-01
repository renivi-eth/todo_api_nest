import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function ToInt(validationOptions?: ValidationOptions) {
  // Возвращаем фабричную функцию, target - то к чему применяем (TaskQuery), propertyKey(limit) - ключ свойства
  return function (target: Object, propertyKey: string) {
    // Регистрируем декоратор
    registerDecorator({
      name: 'toInt',
      target: target.constructor,
      propertyName: propertyKey,
      options: validationOptions,
      validator: {
        // value принимает из DTO TaskQuery limit?: string
        validate(value: string, args: ValidationArguments) {
          const limitToInt = Number(value);

          // True если тип числом, целое число, больше 0 и меньше 100
          return typeof limitToInt === 'number' && Number.isInteger(limitToInt) && limitToInt > 0 && limitToInt <= 100;
        },
        // Если не проходим проверку (false), отдаем ошибку валидации
        defaultMessage(args: ValidationArguments) {
          return `Limit must be an Integer between 1 and 100`;
        },
      },
    });
  };
}
