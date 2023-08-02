import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationService {
  notifyEmail(notifyEmailDto: NotifyEmailDto) {
    console.log(notifyEmailDto);
    
  }
}
