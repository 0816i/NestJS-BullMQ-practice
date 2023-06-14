import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('testParentQueue', { concurrency: 5 })
@Injectable()
export class ParentConsumerService extends WorkerHost {
  constructor(@Inject(Logger) private readonly logger: Logger) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`ParentJob ${job.id} is consumed by worker`);
    return 'completed';
  }
}

@Processor('testChildQueue', { concurrency: 5 })
@Injectable()
export class ChildConsumerService extends WorkerHost {
  constructor(@Inject(Logger) private readonly logger: Logger) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`ChildJob ${job.id} is consumed by worker`);
    return 'completed';
  }
}
