import { ConfigService } from '@nestjs/config';

export const QUEUE_MODULE_OPTIONS = 'QUEUE_MODULE_OPTIONS';

export interface typeProductEntity {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface QueueOptions {
  host: string;
  port: number;
  user: string;
  password: string;
}

export interface QueueModuleOptions {
  imports?: any[];
  useFactory: (ConfigService: ConfigService) => QueueOptions;
  inject?: any[];
}
