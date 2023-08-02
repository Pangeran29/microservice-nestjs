import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from './dto/create-charge.dto';
import { NOTIFICATION_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentCreateChrageDto } from './dto/payment-create-charge.dto';

@Injectable()
export class PaymentService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: ClientProxy
  ) { }

  private readonly stripeService = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: "2022-11-15"
    }
  );

  async createCharge({ email }: PaymentCreateChrageDto) {
    const createdCharge = await this.stripeService.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "product.name",
            },
            unit_amount: 10 * 100,
          },
          quantity: 10,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    this.notificationService.emit('notify_email',
      { email, paymentUrl: createdCharge.url }
    );

    return createdCharge
  }
}
