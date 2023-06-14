import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('testQueue', { concurrency: 5 })
@Injectable()
export class ConsumerService extends WorkerHost {
  constructor(@Inject(Logger) private readonly logger: Logger) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`${job.id} is consumed by worker`);
    return 'completed';
  }
}
