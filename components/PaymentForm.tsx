"use client";

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CountrySelector } from '@/components/CountrySelector';
import { calculatePPP, formatPrice } from '@/lib/ppp';
import { CreditCard, Lock } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentFormProps {
  amount: number;
  currency?: string;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
  orderId: string;
  userId: string;
}

function PaymentFormInner({ 
  amount, 
  currency = 'USD', 
  onSuccess, 
  onError, 
  orderId, 
  userId 
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [pppResult, setPppResult] = useState(calculatePPP(amount, selectedCountry, currency));

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    const result = calculatePPP(amount, countryCode, currency);
    setPppResult(result);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment intent with PPP-adjusted amount
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: pppResult.adjustedPrice,
          currency: pppResult.currency,
          orderId,
          userId,
        }),
      });

      const { clientSecret } = await response.json();

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        onError(error.message || 'Payment failed');
      } else if (paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent);
      }
    } catch (error) {
      onError('An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Payment Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Country Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <CountrySelector
              onCountryChange={handleCountryChange}
              currentCountry={selectedCountry}
              showPrice={true}
              samplePrice={amount}
            />
          </div>

          {/* Price Display */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Amount</span>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {formatPrice(pppResult.adjustedPrice, pppResult.currency)}
                </div>
                {pppResult.adjustedPrice !== pppResult.originalPrice && (
                  <div className="text-sm text-gray-500">
                    Original: {formatPrice(pppResult.originalPrice, currency)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card Element */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Information
            </label>
            <div className="border border-gray-300 rounded-lg p-3">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Lock className="h-4 w-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!stripe || isProcessing}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            {isProcessing ? 'Processing...' : `Pay ${formatPrice(pppResult.adjustedPrice, pppResult.currency)}`}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}

export function PaymentForm(props: PaymentFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentFormInner {...props} />
    </Elements>
  );
}
