/**
 * DTO для возвращаемых данных для /tag
 */
export type Tag_PG_RS = {
  id: string;
  name: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
};
