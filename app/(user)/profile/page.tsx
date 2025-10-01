"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Save, 
  X,
  Package,
  Heart,
  Settings,
  Bell,
  Shield,
  CreditCard,
  Truck,
  Star,
  Calendar
} from "lucide-react";

export default function ProfilePage() {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    preferences: {
      newsletter: true,
      smsUpdates: false,
      productRecommendations: true
    }
  });

  const handleSave = () => {
    // Save profile data
    console.log("Saving profile:", profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data
    setProfileData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.primaryEmailAddress?.emailAddress || "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
      preferences: {
        newsletter: true,
        smsUpdates: false,
        productRecommendations: true
      }
    });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith("preferences.")) {
      const prefKey = name.split(".")[1];
      setProfileData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefKey]: type === "checkbox" ? checked : value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const recentOrders = [
    {
      id: "HBS-2024-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 127.50,
      items: 3
    },
    {
      id: "HBS-2024-002",
      date: "2024-01-10",
      status: "Shipped",
      total: 89.99,
      items: 2
    },
    {
      id: "HBS-2024-003",
      date: "2024-01-05",
      status: "Processing",
      total: 156.75,
      items: 4
    }
  ];

  const wishlistItems = [
    {
      id: 1,
      name: "Organic Vitamin C Serum",
      price: 45.99,
      image: "/products/vitamin-c-serum.jpg"
    },
    {
      id: 2,
      name: "Hydrating Face Cream",
      price: 32.50,
      image: "/products/face-cream.jpg"
    },
    {
      id: 3,
      name: "Gentle Cleanser",
      price: 28.00,
      image: "/products/cleanser.jpg"
    }
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background pt-16">
        {/* Header */}
        <div className="bg-background border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Welcome back, {user?.firstName || "User"}!
                </h1>
                <p className="text-muted-foreground">Manage your account and preferences</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-background rounded-2xl shadow-sm border border-gray-200 p-6">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                          activeTab === tab.id
                            ? "bg-green-100 text-green-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="bg-background rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-foreground">Personal Information</h2>
                      {!isEditing ? (
                        <Button
                          onClick={() => setIsEditing(true)}
                          variant="outline"
                          className="border-green-600 text-green-600 hover:bg-green-50"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      ) : (
                        <div className="flex space-x-2">
                          <Button
                            onClick={handleSave}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save
                          </Button>
                          <Button
                            onClick={handleCancel}
                            variant="outline"
                            className="border-gray-300 text-gray-700 hover:bg-muted/50"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <Input
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="border-gray-300 rounded-xl focus:border-green-500 focus:ring-green-500 disabled:bg-muted/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <Input
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="border-gray-300 rounded-xl focus:border-green-500 focus:ring-green-500 disabled:bg-muted/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="border-gray-300 rounded-xl focus:border-green-500 focus:ring-green-500 disabled:bg-muted/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="border-gray-300 rounded-xl focus:border-green-500 focus:ring-green-500 disabled:bg-muted/50"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Address Information</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Street Address
                          </label>
                          <Input
                            name="address"
                            value={profileData.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="border-gray-300 rounded-xl focus:border-green-500 focus:ring-green-500 disabled:bg-muted/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City
                          </label>
                          <Input
                            name="city"
                            value={profileData.city}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="border-gray-300 rounded-xl focus:border-green-500 focus:ring-green-500 disabled:bg-muted/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State
                          </label>
                          <Input
                            name="state"
                            value={profileData.state}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="border-gray-300 rounded-xl focus:border-green-500 focus:ring-green-500 disabled:bg-muted/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ZIP Code
                          </label>
                          <Input
                            name="zipCode"
                            value={profileData.zipCode}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="border-gray-300 rounded-xl focus:border-green-500 focus:ring-green-500 disabled:bg-muted/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country
                          </label>
                          <Input
                            name="country"
                            value={profileData.country}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="border-gray-300 rounded-xl focus:border-green-500 focus:ring-green-500 disabled:bg-muted/50"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="bg-background rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-foreground mb-6">Communication Preferences</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-foreground">Email Newsletter</h3>
                          <p className="text-sm text-gray-500">Receive beauty tips and product updates</p>
                        </div>
                        <input
                          type="checkbox"
                          name="preferences.newsletter"
                          checked={profileData.preferences.newsletter}
                          onChange={handleChange}
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-foreground">SMS Updates</h3>
                          <p className="text-sm text-gray-500">Get order updates via text message</p>
                        </div>
                        <input
                          type="checkbox"
                          name="preferences.smsUpdates"
                          checked={profileData.preferences.smsUpdates}
                          onChange={handleChange}
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-foreground">Product Recommendations</h3>
                          <p className="text-sm text-gray-500">Personalized product suggestions</p>
                        </div>
                        <input
                          type="checkbox"
                          name="preferences.productRecommendations"
                          checked={profileData.preferences.productRecommendations}
                          onChange={handleChange}
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="space-y-6">
                  <div className="bg-background rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-foreground mb-6">Order History</h2>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-foreground">Order #{order.id}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(order.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Package className="w-4 h-4" />
                                  <span>{order.items} items</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-semibold text-foreground">${order.total}</div>
                              <Badge 
                                className={`${
                                  order.status === "Delivered" ? "bg-green-100 text-green-800" :
                                  order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                                  "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div className="space-y-6">
                  <div className="bg-background rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-foreground mb-6">Your Wishlist</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                          <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                            <Heart className="w-8 h-8 text-gray-400" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">{item.name}</h3>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-foreground">${item.price}</span>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="bg-background rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-foreground mb-6">Account Settings</h2>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-foreground">Change Password</h3>
                          <p className="text-sm text-gray-500">Update your account password</p>
                        </div>
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                          Change
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-foreground">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-500">Add an extra layer of security</p>
                        </div>
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                          Enable
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-foreground">Delete Account</h3>
                          <p className="text-sm text-gray-500">Permanently delete your account</p>
                        </div>
                        <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
