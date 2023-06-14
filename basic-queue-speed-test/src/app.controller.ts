import { AppService } from '@app/app.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Controller, Get, Inject } from '@nestjs/common';
import { Queue } from 'bullmq';

@Controller()
export class AppController {
  constructor(
    @Inject(AppService) private readonly appService: AppService,
    @InjectQueue('testQueue') private readonly testQueue: Queue,
  ) {}

  @Get('/publish')
  async publishMessage() {
    const promises = [];
    for (let i = 0; i < 50000; i++) {
      promises.push(this.appService.publishMessage());
    }
    const startTime = new Date();
    await Promise.all(promises);
    return `${new Date().getTime() - startTime.getTime()}ms`;
  }
}
