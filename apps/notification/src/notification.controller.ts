import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern('notify_email')
  notifyEmail(@Payload() notifyEmailDto: NotifyEmailDto) {
    this.notificationService.notifyPaymentByEmail(notifyEmailDto);
  }
}
