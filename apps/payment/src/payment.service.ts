import { ConflictException, Injectable } from '@nestjs/common';
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
    try {
      return await this.stripeService.checkout.sessions.create({ 
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
    } catch (error) {
      throw new ConflictException('Fail to checkout.');
    }
  }
}
