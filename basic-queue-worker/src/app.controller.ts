import { AppService } from '@app/app.service';
import { Controller, Get, Inject } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(@Inject(AppService) private readonly appService: AppService) {}

  @Get('/publish')
  async publishMessage(): Promise<string> {
    return await this.appService.publishMessage();
  }
}
