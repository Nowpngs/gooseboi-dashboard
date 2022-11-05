import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const HasRole = (...role: Role[]) => SetMetadata('role', role);
