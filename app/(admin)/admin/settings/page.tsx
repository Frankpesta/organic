"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Store, 
  Mail, 
  Globe, 
  Shield, 
  CreditCard,
  Truck,
  Bell,
  Save,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  // Store Settings
  const [storeSettings, setStoreSettings] = useState({
    storeName: "Helen's Beauty Secret",
    storeDescription: "Organic skincare products for natural beauty",
    storeEmail: "hello@helensbeautysecret.com",
    storePhone: "+1 (555) 123-4567",
    storeAddress: "123 Beauty Lane, Wellness City, WC 12345",
    currency: "USD",
    timezone: "America/New_York",
    taxRate: 8.5,
    enableInventoryTracking: true,
    enableReviews: true,
    enableWishlist: true,
  });

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "",
    smtpPort: "587",
    smtpUser: "",
    smtpPassword: "",
    fromEmail: "noreply@helensbeautysecret.com",
    fromName: "Helen's Beauty Secret",
    enableOrderEmails: true,
    enableWelcomeEmails: true,
    enableMarketingEmails: false,
  });

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    stripePublishableKey: "",
    stripeSecretKey: "",
    enableStripe: true,
    enablePayPal: false,
    paypalClientId: "",
    paypalClientSecret: "",
  });

  // Shipping Settings
  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: 50,
    enablePPP: true,
    defaultShippingRate: 5.99,
    internationalShipping: true,
    processingTime: "1-2 business days",
  });

  const handleSaveSettings = async (section: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`${section} settings saved successfully!`);
    } catch (error) {
      toast.error(`Failed to save ${section} settings`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Configure your store settings and preferences</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Store className="h-5 w-5 mr-2" />
              Store Information
            </CardTitle>
            <CardDescription>Basic information about your store</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="storeName">Store Name</Label>
              <Input
                id="storeName"
                value={storeSettings.storeName}
                onChange={(e) => setStoreSettings({...storeSettings, storeName: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="storeDescription">Store Description</Label>
              <Textarea
                id="storeDescription"
                value={storeSettings.storeDescription}
                onChange={(e) => setStoreSettings({...storeSettings, storeDescription: e.target.value})}
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="storeEmail">Store Email</Label>
              <Input
                id="storeEmail"
                type="email"
                value={storeSettings.storeEmail}
                onChange={(e) => setStoreSettings({...storeSettings, storeEmail: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="storePhone">Store Phone</Label>
              <Input
                id="storePhone"
                value={storeSettings.storePhone}
                onChange={(e) => setStoreSettings({...storeSettings, storePhone: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="storeAddress">Store Address</Label>
              <Textarea
                id="storeAddress"
                value={storeSettings.storeAddress}
                onChange={(e) => setStoreSettings({...storeSettings, storeAddress: e.target.value})}
                rows={2}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  value={storeSettings.currency}
                  onChange={(e) => setStoreSettings({...storeSettings, currency: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  step="0.1"
                  value={storeSettings.taxRate}
                  onChange={(e) => setStoreSettings({...storeSettings, taxRate: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="enableInventoryTracking">Enable Inventory Tracking</Label>
                <Switch
                  id="enableInventoryTracking"
                  checked={storeSettings.enableInventoryTracking}
                  onCheckedChange={(checked) => setStoreSettings({...storeSettings, enableInventoryTracking: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="enableReviews">Enable Product Reviews</Label>
                <Switch
                  id="enableReviews"
                  checked={storeSettings.enableReviews}
                  onCheckedChange={(checked) => setStoreSettings({...storeSettings, enableReviews: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="enableWishlist">Enable Wishlist</Label>
                <Switch
                  id="enableWishlist"
                  checked={storeSettings.enableWishlist}
                  onCheckedChange={(checked) => setStoreSettings({...storeSettings, enableWishlist: checked})}
                />
              </div>
            </div>
            
            <Button 
              onClick={() => handleSaveSettings('Store')}
              disabled={isLoading}
              className="w-full"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Store Settings
            </Button>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Email Configuration
            </CardTitle>
            <CardDescription>Configure email notifications and SMTP settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fromEmail">From Email</Label>
                <Input
                  id="fromEmail"
                  type="email"
                  value={emailSettings.fromEmail}
                  onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="fromName">From Name</Label>
                <Input
                  id="fromName"
                  value={emailSettings.fromName}
                  onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input
                id="smtpHost"
                value={emailSettings.smtpHost}
                onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
                placeholder="smtp.gmail.com"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="smtpPort">SMTP Port</Label>
                <Input
                  id="smtpPort"
                  value={emailSettings.smtpPort}
                  onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="smtpUser">SMTP User</Label>
                <Input
                  id="smtpUser"
                  value={emailSettings.smtpUser}
                  onChange={(e) => setEmailSettings({...emailSettings, smtpUser: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="smtpPassword">SMTP Password</Label>
              <Input
                id="smtpPassword"
                type="password"
                value={emailSettings.smtpPassword}
                onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="enableOrderEmails">Order Confirmation Emails</Label>
                <Switch
                  id="enableOrderEmails"
                  checked={emailSettings.enableOrderEmails}
                  onCheckedChange={(checked) => setEmailSettings({...emailSettings, enableOrderEmails: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="enableWelcomeEmails">Welcome Emails</Label>
                <Switch
                  id="enableWelcomeEmails"
                  checked={emailSettings.enableWelcomeEmails}
                  onCheckedChange={(checked) => setEmailSettings({...emailSettings, enableWelcomeEmails: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="enableMarketingEmails">Marketing Emails</Label>
                <Switch
                  id="enableMarketingEmails"
                  checked={emailSettings.enableMarketingEmails}
                  onCheckedChange={(checked) => setEmailSettings({...emailSettings, enableMarketingEmails: checked})}
                />
              </div>
            </div>
            
            <Button 
              onClick={() => handleSaveSettings('Email')}
              disabled={isLoading}
              className="w-full"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Email Settings
            </Button>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Methods
            </CardTitle>
            <CardDescription>Configure payment gateways and options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enableStripe">Enable Stripe</Label>
              <Switch
                id="enableStripe"
                checked={paymentSettings.enableStripe}
                onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, enableStripe: checked})}
              />
            </div>
            
            {paymentSettings.enableStripe && (
              <>
                <div>
                  <Label htmlFor="stripePublishableKey">Stripe Publishable Key</Label>
                  <Input
                    id="stripePublishableKey"
                    value={paymentSettings.stripePublishableKey}
                    onChange={(e) => setPaymentSettings({...paymentSettings, stripePublishableKey: e.target.value})}
                    placeholder="pk_test_..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="stripeSecretKey">Stripe Secret Key</Label>
                  <Input
                    id="stripeSecretKey"
                    type="password"
                    value={paymentSettings.stripeSecretKey}
                    onChange={(e) => setPaymentSettings({...paymentSettings, stripeSecretKey: e.target.value})}
                    placeholder="sk_test_..."
                  />
                </div>
              </>
            )}
            
            <div className="flex items-center justify-between">
              <Label htmlFor="enablePayPal">Enable PayPal</Label>
              <Switch
                id="enablePayPal"
                checked={paymentSettings.enablePayPal}
                onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, enablePayPal: checked})}
              />
            </div>
            
            {paymentSettings.enablePayPal && (
              <>
                <div>
                  <Label htmlFor="paypalClientId">PayPal Client ID</Label>
                  <Input
                    id="paypalClientId"
                    value={paymentSettings.paypalClientId}
                    onChange={(e) => setPaymentSettings({...paymentSettings, paypalClientId: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="paypalClientSecret">PayPal Client Secret</Label>
                  <Input
                    id="paypalClientSecret"
                    type="password"
                    value={paymentSettings.paypalClientSecret}
                    onChange={(e) => setPaymentSettings({...paymentSettings, paypalClientSecret: e.target.value})}
                  />
                </div>
              </>
            )}
            
            <Button 
              onClick={() => handleSaveSettings('Payment')}
              disabled={isLoading}
              className="w-full"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Payment Settings
            </Button>
          </CardContent>
        </Card>

        {/* Shipping Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="h-5 w-5 mr-2" />
              Shipping Configuration
            </CardTitle>
            <CardDescription>Configure shipping rates and options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
              <Input
                id="freeShippingThreshold"
                type="number"
                step="0.01"
                value={shippingSettings.freeShippingThreshold}
                onChange={(e) => setShippingSettings({...shippingSettings, freeShippingThreshold: parseFloat(e.target.value) || 0})}
              />
            </div>
            
            <div>
              <Label htmlFor="defaultShippingRate">Default Shipping Rate ($)</Label>
              <Input
                id="defaultShippingRate"
                type="number"
                step="0.01"
                value={shippingSettings.defaultShippingRate}
                onChange={(e) => setShippingSettings({...shippingSettings, defaultShippingRate: parseFloat(e.target.value) || 0})}
              />
            </div>
            
            <div>
              <Label htmlFor="processingTime">Processing Time</Label>
              <Input
                id="processingTime"
                value={shippingSettings.processingTime}
                onChange={(e) => setShippingSettings({...shippingSettings, processingTime: e.target.value})}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="enablePPP">Enable Purchase Power Parity</Label>
                <Switch
                  id="enablePPP"
                  checked={shippingSettings.enablePPP}
                  onCheckedChange={(checked) => setShippingSettings({...shippingSettings, enablePPP: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="internationalShipping">International Shipping</Label>
                <Switch
                  id="internationalShipping"
                  checked={shippingSettings.internationalShipping}
                  onCheckedChange={(checked) => setShippingSettings({...shippingSettings, internationalShipping: checked})}
                />
              </div>
            </div>
            
            <Button 
              onClick={() => handleSaveSettings('Shipping')}
              disabled={isLoading}
              className="w-full"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Shipping Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
