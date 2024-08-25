/**
 * DTO для возвращаемых данных для createUser() / findUser()
 */
export type User_PG_RS = {
  email: string;
  id: string;
  created_at: Date;
  updated_at: Date;
};
