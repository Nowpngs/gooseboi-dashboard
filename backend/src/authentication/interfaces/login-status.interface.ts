import { User } from '@prisma/client';
import { JwtToken } from './jwt-token.interface';

export interface LoginStatus extends JwtToken {
  data: User;
}
