import { Inject, Injectable } from '@nestjs/common';
import {
  QUEUE_MODULE_OPTIONS,
  QueueModuleOptions,
  QueueOptions,
  typeProductEntity,
} from './queue.const';
import * as Bull from 'bull';

@Injectable()
export class QueueService {
  private queue: Bull.Queue<typeProductEntity>;

  constructor(
    @Inject(QUEUE_MODULE_OPTIONS)
    private queueOptions: QueueOptions,
  ) {
    this.queue = new Bull('queue-cqrs', {
      redis: {
        host: this.queueOptions.host,
        port: this.queueOptions.port,
        password: this.queueOptions.password,
        username: this.queueOptions.user,
      },
      defaultJobOptions: {
        removeOnComplete: true,
      },
    });
  }

  public async publish(data: typeProductEntity) {
    const job = await this.queue.add(data);
    return job;
  }

  public async subscribe(callback: (job: Bull.Job<typeProductEntity>) => void) {
    this.queue.process(callback);
  }
}
