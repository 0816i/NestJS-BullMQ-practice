import { Logger, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { ConsumerService } from '@app/consumer.service';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'testQueue',
      processors: [
        async (job: Job<any, any, string>) => {
          // something process;
          job.updateProgress(100);
          return 'jobComplete';
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [Logger, AppService, ConsumerService],
})
export class AppModule {}
