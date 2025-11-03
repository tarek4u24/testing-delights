type EnvConfig = {
  baseURL: string;
  adminEmail: string;
  adminPassword: string;
};

const localhost: EnvConfig = {
  baseURL: 'http://localhost:3000/',
  adminEmail: 'admin@admin.com',
  adminPassword: 'abcd1234',
};

const hosted: EnvConfig = {
  baseURL: 'https://hosted.evershop.com/',
  adminEmail: 'admin@hosted.com',
  adminPassword: 'secure1234',
};

// Choose environment based on ENV_NAME or fallback to localhost
const ENV_NAME = process.env.ENV_NAME || 'localhost';

export const config: EnvConfig =
  ENV_NAME === 'hosted' ? hosted : localhost;
