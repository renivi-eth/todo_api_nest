import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data: string, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  if (request.decodedData.id) {
    return request.decodedData.id;
  }
  throw new UnauthorizedException();
});
