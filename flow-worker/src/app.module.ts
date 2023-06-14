import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bullmq';
import {
  ChildConsumerService,
  ParentConsumerService,
} from 'src/consumer.service';

@Module({
  imports: [
    BullModule.forRoot({ connection: { host: 'localhost', port: 6379 } }),
    BullModule.registerFlowProducer({
      name: 'testFlowProducer',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Logger, ParentConsumerService, ChildConsumerService],
})
export class AppModule {}
