import { User } from '@prisma/client';

export interface PaginateUser {
  data: User[];
  total: number;
  page: number;
  totalPage: number;
  limit: number;
}
