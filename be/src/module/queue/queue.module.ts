import { DynamicModule, Global, Module } from '@nestjs/common';
import { QUEUE_MODULE_OPTIONS, QueueModuleOptions } from './queue.const';
import { QueueService } from './queue.service';

@Global()
@Module({})
export class QueueModule {
  static forRootAsync(queueModuleOptions: QueueModuleOptions): DynamicModule {
    return {
      module: QueueModule,
      imports: queueModuleOptions.imports,
      providers: [
        {
          provide: QUEUE_MODULE_OPTIONS,
          useFactory: queueModuleOptions.useFactory,
          inject: queueModuleOptions.inject,
        },
        QueueService,
      ],
      controllers: [],
      exports: [QueueService],
    };
  }
}
