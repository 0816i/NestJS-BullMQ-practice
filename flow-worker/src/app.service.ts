import { InjectFlowProducer } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { FlowProducer } from 'bullmq';
import { randomUUID } from 'crypto';

@Injectable()
export class AppService {
  constructor(
    @InjectFlowProducer('testFlowProducer')
    private readonly testFlowProducer: FlowProducer,
  ) {}

  async produceFlow() {
    const parentJobId = randomUUID();
    await this.testFlowProducer.add({
      name: 'flowTestParent',
      queueName: 'testParentQueue',
      data: { foo: 'bar' },
      children: [
        {
          name: 'flowTestChild',
          queueName: 'testChildQueue',
          data: { idx: 0, foo: 'bar' },
          opts: { jobId: randomUUID() },
        },
        {
          name: 'flowTestChild',
          queueName: 'testChildQueue',
          data: { idx: 1, foo: 'bar' },
          opts: { jobId: randomUUID() },
        },
        {
          name: 'flowTestChild',
          queueName: 'testChildQueue',
          data: { idx: 2, foo: 'bar' },
          opts: { jobId: randomUUID() },
        },
      ],
      opts: { jobId: parentJobId },
    });

    return `${parentJobId} published`;
  }
}
