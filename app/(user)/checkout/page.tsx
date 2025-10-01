"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/lib/stores/cartStore";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { calculatePPP, formatPrice } from "@/lib/ppp";
import { PPPProvider, usePPP } from "@/lib/contexts/PPPContext";
import { createOrder } from "@/lib/actions/orders";
import { createCheckoutSessionAction } from "@/lib/actions/stripe";
import { 
  CreditCard, 
  Truck, 
  Shield, 
  Lock,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
  Clock,
  Package
} from "lucide-react";
import Image from "next/image";

function CheckoutContent() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { selectedCountry, isLoading: pppLoading } = usePPP();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US"
  });
  const [billingInfo, setBillingInfo] = useState({
    sameAsShipping: true,
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    phone: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderNotes, setOrderNotes] = useState("");
  // Country is now managed by PPP context
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<string>("");

  // Fetch delivery methods
  const deliveryMethods = useQuery(api.shipping.getShippingMethods);

  useEffect(() => {
    if (isLoaded && user) {
      setShippingInfo(prev => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.primaryEmailAddress?.emailAddress || ""
      }));
    }
  }, [isLoaded, user]);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Calculate shipping based on selected delivery method
      let shipping = 0;
      if (selectedDeliveryMethod && deliveryMethods) {
        const selectedMethod = deliveryMethods.find(m => m._id === selectedDeliveryMethod);
        if (selectedMethod) {
          const isFree = selectedMethod.freeShippingThreshold && getTotalPrice() >= selectedMethod.freeShippingThreshold;
          if (!isFree) {
            shipping = selectedMethod.price;
          }
        }
      } else {
        shipping = getTotalPrice() >= 50 ? 0 : 9.99;
      }

      const subtotal = getTotalPrice();
      const pppResult = selectedCountry ? calculatePPP(subtotal, selectedCountry) : { 
        adjustedPrice: subtotal, 
        originalPrice: subtotal, 
        currency: 'USD' 
      };
      const tax = pppResult.adjustedPrice * 0.08;
      const total = pppResult.adjustedPrice + shipping + tax;

      // Create order first using Server Action
      const orderResult = await createOrder({
        items: items.map(item => {
          const itemPPP = selectedCountry ? calculatePPP(item.price, selectedCountry) : { 
            adjustedPrice: item.price, 
            originalPrice: item.price, 
            currency: 'USD' 
          };
          return {
            productId: item.productId,
            quantity: item.quantity,
            price: itemPPP.adjustedPrice,
          };
        }),
        shippingAddress: {
          firstName: shippingInfo.firstName,
          lastName: shippingInfo.lastName,
          address1: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          postalCode: shippingInfo.zipCode,
          country: selectedCountry || "US",
          phone: shippingInfo.phone,
        },
        billingAddress: billingInfo.sameAsShipping ? {
          firstName: shippingInfo.firstName,
          lastName: shippingInfo.lastName,
          address1: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          postalCode: shippingInfo.zipCode,
          country: selectedCountry || "US",
          phone: shippingInfo.phone,
        } : {
          firstName: billingInfo.firstName,
          lastName: billingInfo.lastName,
          address1: billingInfo.address,
          city: billingInfo.city,
          state: billingInfo.state,
          postalCode: billingInfo.zipCode,
          country: selectedCountry || "US",
          phone: billingInfo.phone,
        },
        subtotal,
        tax,
        shipping,
        discount: 0,
        total,
        currency: 'usd',
        notes: orderNotes,
        deliveryMethodId: selectedDeliveryMethod,
      });

      if (!orderResult.success || !orderResult.orderId) {
        throw new Error(orderResult.error || 'Failed to create order');
      }

      // Create Stripe Checkout Session using Server Action
      const checkoutResult = await createCheckoutSessionAction({
        orderId: orderResult.orderId,
        items: items.map(item => {
          // Apply PPP pricing to Stripe checkout
          const itemPPP = selectedCountry ? calculatePPP(item.price, selectedCountry) : { 
            adjustedPrice: item.price, 
            originalPrice: item.price, 
            currency: 'USD' 
          };
          return {
            price_data: {
              currency: itemPPP.currency.toLowerCase(),
              product_data: {
                name: item.name,
                images: item.image ? [item.image] : [],
              },
              unit_amount: Math.round(itemPPP.adjustedPrice * 100), // Convert to cents
            },
            quantity: item.quantity,
          };
        }),
        successUrl: `${window.location.origin}/order-success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/checkout`,
      });

      if (!checkoutResult.success) {
        throw new Error(checkoutResult.error);
      }

      // Clear cart before redirecting to Stripe Checkout
      clearCart();
      
      // Redirect to Stripe Checkout
      window.location.href = checkoutResult.url || '';

    } catch (error) {
      console.error('Checkout failed:', error);
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <CreditCard className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some products to get started</p>
          <Button onClick={() => router.push('/shop')} className="bg-green-600 hover:bg-green-700 text-white">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="p-2 hover:bg-muted rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            {/* Shipping Information */}
            <div className="bg-card rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center">
                <Truck className="w-5 h-5 mr-2 text-green-600" />
                Shipping Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name *
                  </label>
                  <Input
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleShippingChange}
                    required
                    className="rounded-xl focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name *
                  </label>
                  <Input
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleShippingChange}
                    required
                    className="rounded-xl focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleShippingChange}
                  required
                  className="rounded-xl focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleShippingChange}
                  className="rounded-xl focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Street Address *
                </label>
                <Input
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                  required
                  className="rounded-xl focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    City *
                  </label>
                  <Input
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleShippingChange}
                    required
                    className="rounded-xl focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    State *
                  </label>
                  <Input
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleShippingChange}
                    required
                    className="rounded-xl focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    ZIP Code *
                  </label>
                  <Input
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleShippingChange}
                    required
                    className="rounded-xl focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* PPP pricing is automatically applied based on your location */}
            </div>

            {/* Delivery Method Selection */}
            <div className="bg-card rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center">
                <Package className="w-5 h-5 mr-2 text-green-600" />
                Delivery Method
              </h2>
              
              {deliveryMethods && deliveryMethods.length > 0 ? (
                <RadioGroup
                  value={selectedDeliveryMethod}
                  onValueChange={setSelectedDeliveryMethod}
                  className="space-y-4"
                >
                  {deliveryMethods
                    .filter(method => 
                      method.isActive && 
                      (method.countryCode === 'ALL' || method.countryCode === selectedCountry)
                    )
                    .map((method) => {
                      const methodPrice = calculatePPP(method.price, selectedCountry);
                      const isFree = method.freeShippingThreshold && getTotalPrice() >= method.freeShippingThreshold;
                      
                      return (
                        <div key={method._id} className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value={method._id} id={method._id} />
                          <Label htmlFor={method._id} className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-foreground">{method.name}</div>
                                {method.description && (
                                  <div className="text-sm text-muted-foreground">{method.description}</div>
                                )}
                                <div className="flex items-center space-x-4 mt-1">
                                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    <span>{method.estimatedDays}</span>
                                  </div>
                                  {isFree && (
                                    <Badge variant="secondary" className="text-xs">
                                      Free Shipping
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium text-foreground">
                                  {isFree ? (
                                    <span className="text-green-600">Free</span>
                                  ) : (
                                    formatPrice(methodPrice.adjustedPrice, methodPrice.currency)
                                  )}
                                </div>
                                {!isFree && methodPrice.adjustedPrice !== methodPrice.originalPrice && (
                                  <div className="text-xs text-muted-foreground line-through">
                                    {formatPrice(methodPrice.originalPrice, 'USD')}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Label>
                        </div>
                      );
                    })}
                </RadioGroup>
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No delivery methods available for your location.</p>
                </div>
              )}
            </div>

            {/* Payment Information */}
            <div className="bg-card rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                Payment Information
              </h2>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-foreground">Secure Payment Processing</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Your payment will be processed securely by Stripe. We never store your payment information.
                </p>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>256-bit SSL encryption</span>
                  <CheckCircle className="w-4 h-4 text-green-600 ml-4" />
                  <span>PCI DSS compliant</span>
                </div>
              </div>
            </div>

            {/* Order Notes */}
            <div className="bg-card rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Order Notes</h2>
              <textarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Any special instructions for your order?"
                rows={4}
                className="w-full px-4 py-3 border border-input rounded-xl focus:border-green-500 focus:ring-green-500 resize-none bg-background"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl shadow-sm border p-6 sticky top-8">
              <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-foreground truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="space-y-3 border-t border-border pt-4">
                {(() => {
                  const subtotal = getTotalPrice();
                  const subtotalPPP = selectedCountry ? calculatePPP(subtotal, selectedCountry) : { 
                    adjustedPrice: subtotal, 
                    originalPrice: subtotal, 
                    currency: 'USD' 
                  };
                  
                  // Calculate shipping based on selected delivery method
                  let shipping = 0;
                  let shippingPPP = { adjustedPrice: 0, currency: 'USD' };
                  
                  if (selectedDeliveryMethod && deliveryMethods) {
                    const selectedMethod = deliveryMethods.find(m => m._id === selectedDeliveryMethod);
                    if (selectedMethod) {
                      const isFree = selectedMethod.freeShippingThreshold && subtotal >= selectedMethod.freeShippingThreshold;
                      if (!isFree) {
                        shipping = selectedMethod.price;
                        shippingPPP = selectedCountry ? calculatePPP(shipping, selectedCountry) : { 
                          adjustedPrice: shipping, 
                          originalPrice: shipping, 
                          currency: 'USD' 
                        };
                      }
                    }
                  } else {
                    // Fallback to default shipping
                    shipping = subtotal >= 50 ? 0 : 9.99;
                    shippingPPP = selectedCountry ? calculatePPP(shipping, selectedCountry) : { 
                      adjustedPrice: shipping, 
                      originalPrice: shipping, 
                      currency: 'USD' 
                    };
                  }
                  
                  const tax = subtotal * 0.08;
                  const taxPPP = selectedCountry ? calculatePPP(tax, selectedCountry) : { 
                    adjustedPrice: tax, 
                    originalPrice: tax, 
                    currency: 'USD' 
                  };
                  const total = subtotal + shipping + tax;
                  const totalPPP = selectedCountry ? calculatePPP(total, selectedCountry) : { 
                    adjustedPrice: total, 
                    originalPrice: total, 
                    currency: 'USD' 
                  };
                  
                  return (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground">
                          {formatPrice(subtotalPPP.adjustedPrice, subtotalPPP.currency)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-foreground">
                          {shipping === 0 ? "Free" : formatPrice(shippingPPP.adjustedPrice, shippingPPP.currency)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax</span>
                        <span className="text-foreground">
                          {formatPrice(taxPPP.adjustedPrice, taxPPP.currency)}
                        </span>
                      </div>
                      {subtotalPPP.adjustedPrice !== subtotalPPP.originalPrice && (
                        <div className="text-xs text-muted-foreground bg-green-50 dark:bg-green-950 p-2 rounded">
                          <strong>Local Pricing:</strong> Adjusted for your region
                        </div>
                      )}
                      <div className="flex justify-between text-lg font-bold border-t border-border pt-3">
                        <span>Total</span>
                        <span>{formatPrice(totalPPP.adjustedPrice, totalPPP.currency)}</span>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Security Badges */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4 text-green-600" />
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold rounded-xl disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Place Order
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <PPPProvider>
      <CheckoutContent />
    </PPPProvider>
  );
}