import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const CurrentUser = createParamDecorator((ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  if (request.decodedData.id) {
    return request.decodedData.id;
  }
  throw new UnauthorizedException();
});
