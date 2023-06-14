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
    }),
  ],
  controllers: [AppController],
  providers: [Logger, AppService, ConsumerService],
})
export class AppModule {}
