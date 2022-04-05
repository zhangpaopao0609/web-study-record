// export const dbConfig = registerAs('db', () => ({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'pass123',
//   database: 'postgres',
//   autoLoadEntities: true,
//   synchronize: true,
// }));

const isProd = process.env.NODE_ENV === 'production';

export const dbConfig = {
  type: 'postgres' as any,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  autoLoadEntities: true,
  synchronize: !isProd,
};

export const DEVPORT = 6767;
