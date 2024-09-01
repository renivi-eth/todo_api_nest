export type UserJwtPayload = {
  // ID пользователя, UUID
  id: string;

  // Password хэшируемый пароль пользователя
  password: string;
};
