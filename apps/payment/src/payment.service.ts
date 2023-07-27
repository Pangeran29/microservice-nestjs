import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from './dto/create-charge.dto';

@Injectable()
export class PaymentService {
  constructor(
    private readonly configService: ConfigService
  ) { }

  private readonly stripeService = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: "2022-11-15"
    }
  );

  async createCharge(
    {card, amount }: CreateChargeDto
  ) {
    const paymentMethod = await this.stripeService.paymentMethods.create({
      type: 'card',
      card
    });

    const paymentIntent = await this.stripeService.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd'
    });

    return paymentIntent;

  }
}
