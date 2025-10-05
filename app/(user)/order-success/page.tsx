"use client";

import { useQuery } from "convex/react";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  CreditCard,
  Download,
  Heart,
  Mail,
  MapPin,
  Package,
  Truck,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const session = searchParams.get("session_id");
    setSessionId(session);
  }, [searchParams]);

  // Get order details using the session ID
  const order = useQuery(
    api.orders.getOrderBySessionId,
    sessionId ? { sessionId } : "skip",
  );

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Invalid Order
          </h1>
          <p className="text-muted-foreground mb-6">No session ID provided</p>
          <Link href="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (order === undefined) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Order Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find your order details
          </p>
          <Link href="/dashboard">
            <Button>View My Orders</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Order Confirmed!
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Thank you for your purchase! Your order has been successfully placed
            and you'll receive a confirmation email shortly.
          </p>

          {/* Order Summary */}
          <div className="bg-background rounded-lg border p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Order Summary
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Number:</span>
                <span className="font-medium">{order.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge className="bg-green-100 text-green-800">
                  {order.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total:</span>
                <span className="font-medium">${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Status:</span>
                <Badge className="bg-green-100 text-green-800">
                  {order.paymentStatus}
                </Badge>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Order Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Number:</span>
                  <span className="font-medium">{order.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Date:</span>
                  <span className="font-medium">
                    {new Date(order._creationTime).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span className="font-medium">Credit Card</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-medium">${order.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-muted-foreground block mb-1">
                    Delivery Address:
                  </span>
                  <span className="font-medium">
                    {order.shippingAddress?.firstName}{" "}
                    {order.shippingAddress?.lastName}
                    <br />
                    {order.shippingAddress?.address1}
                    <br />
                    {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.state}{" "}
                    {order.shippingAddress?.postalCode}
                    <br />
                    {order.shippingAddress?.country}
                  </span>
                </div>
                {order.deliveryMethod && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Shipping Method:
                    </span>
                    <span className="font-medium">
                      {order.deliveryMethod.name}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <div className="bg-background rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              What's Next?
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Confirmation Email
                </h3>
                <p className="text-muted-foreground text-sm">
                  You'll receive an order confirmation email with all the
                  details within the next few minutes.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Order Processing
                </h3>
                <p className="text-muted-foreground text-sm">
                  We'll prepare your order and send it out within 1-2 business
                  days.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Tracking Information
                </h3>
                <p className="text-muted-foreground text-sm">
                  You'll get tracking information once your order ships.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/dashboard">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl">
                <User className="mr-2 h-5 w-5" />
                View My Dashboard
              </Button>
            </Link>

            <Link href="/shop">
              <Button
                variant="outline"
                className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-xl"
              >
                Continue Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Additional Information */}
          <div className="bg-green-50 rounded-2xl p-6 mb-8">
            <div className="flex items-start space-x-4">
              <Heart className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Thank you for choosing Helen's Beauty Secret!
                </h3>
                <p className="text-green-800">
                  We're excited for you to experience the transformative power
                  of our organic skincare products. If you have any questions or
                  need assistance, our customer service team is here to help.
                </p>
              </div>
            </div>
          </div>

          {/* Support Information */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Need help? Contact our customer service team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <a
                href="mailto:support@helensbeautysecret.com"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                support@helensbeautysecret.com
              </a>
              <span className="hidden sm:block text-gray-400">•</span>
              <a
                href="tel:+1-800-HELEN-BEAUTY"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                +1 (800) HELEN-BEAUTY
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
