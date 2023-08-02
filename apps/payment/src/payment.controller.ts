import { Controller, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateChargeDto } from './dto/create-charge.dto';
import { PaymentCreateChrageDto } from './dto/payment-create-charge.dto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @MessagePattern('create_charge')
  async createCharge(@Payload() data: PaymentCreateChrageDto) {
    return await this.paymentService.createCharge(data);
  }
}
