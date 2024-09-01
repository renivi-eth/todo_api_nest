import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/**
 * Кастомный декоратор, проверяет что пароль это строка
 * Должен иметь быть больше 8 символов, содержать хотя бы один заглавный и строчный символ
 */
export const IsStrongPassword = (validationOptions?: ValidationOptions) => {
  // Возвращаем фабричную функцию, target - то к чему применяем User_FR_RQ, свойство password: string
  return function (target: Object, propertyName: string) {
    registerDecorator({
      name: 'isStrongPassword',
      target: target.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }

          if (value.length < 8) {
            return false;
          }

          // TODO: проходить должны только английские символы

          if (!/[A-ZА-ЯЁ]/.test(value)) {
            return false;
          }

          if (!/[a-zа-яё]/.test(value)) {
            return false;
          }

          // Проверка на наличие хотя бы одной цифры
          return /\d/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Password must have a minimum of 8 characters, including Upper and Lower case letters and Numbers';
        },
      },
    });
  };
};
