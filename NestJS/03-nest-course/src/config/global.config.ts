import { registerAs } from '@nestjs/config';

export const globalConfig = registerAs('coffees', () => ({
  foo: 'bar',
}));
