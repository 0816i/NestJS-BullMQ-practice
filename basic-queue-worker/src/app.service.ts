import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { randomUUID } from 'crypto';

@Injectable()
export class AppService {
  constructor(@InjectQueue('testQueue') private readonly testQueue: Queue) {}

  async publishMessage(): Promise<string> {
    const jobId = randomUUID();
    await this.testQueue.add('name', { foo: 'bar' }, { jobId });
    return `${jobId} published`;
  }
}
