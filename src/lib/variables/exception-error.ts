/**
 * Перехватчик ошибок для обработки ошибок в приложении
 */
export enum ExceptionError {
  // Ошибка, если пользователя не найден в БД (Auth.service)
  USER_NOT_FOUND = 'User not found',

  // Ошибка, если пароль пользователя не проходит валидацию с паролем в БД (Auth.service)
  BAD_PASSWORD = 'Password is wrong',

  // Ошибка, если такой пользователь с Email уже существует в БД
  ALREADY_REGISTERED_ERROR = 'User with Email already registered',

  // Ошибка, если задача не найдена в БД (TagService)
  TASK_NOT_FOUND = 'Task not found',

  // Ошибка, если тэг не найден в БД (TagService)
  TAG_NOT_FOUND = 'Tag not found',

  // Ошибка, если связь между задачей и тэгом уже существует в БД (TagService)
  RELATION_ALREADY_EXIST = 'Relation already exist',

  // Ошибка, если при использовании декоратора @CurrentUser() decodedData отсутствует 
  DECODED_DATA_EMPTY = 'DecodedData is empty'
}
