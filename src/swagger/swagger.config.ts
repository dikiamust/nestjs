import { SwaggerConfig } from './swagger.interface';

/**
 * Configuration for the swagger UI (found at /api).
 * Change this to suit your app!
 */
export const SWAGGER_CONFIG: SwaggerConfig = {
  title: 'Backend Template',
  description: 'Backend built using NestJs + PostgreSql + TypeOrm',
  version: '1.0',
  tags: [],
  contact:  {
    name: '',
    url: '',
    email: '',
  },
};
