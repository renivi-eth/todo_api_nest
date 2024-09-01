import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ExceptionError } from '../variables/exception-error';

export const CurrentUser = createParamDecorator((data: string, context: ExecutionContext) => {
  // Вытаскиваем весь request
  const request = context.switchToHttp().getRequest();

  // Если закодированная информация от Auth.guard (decodedData) есть, возвращаем ID
  if (request.decodedData.id) {
    return request.decodedData.id;
  }
  // Возвращаем ошибку, если DecodedData.id пустая
  throw new UnauthorizedException(ExceptionError.DECODED_DATA_EMPTY);
});
