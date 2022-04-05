import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'public_key';

export const Public = () =>
  SetMetadata(IS_PUBLIC_KEY, true);
