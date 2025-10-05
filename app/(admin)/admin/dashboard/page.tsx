"use client";

import { useQuery } from "convex/react";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  Eye,
  MapPin,
  Package,
  ShoppingCart,
  Truck,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
export default function AdminDashboard() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const dashboardStats = useQuery(api.admin.getDashboardStats);

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  console.log("Dashboard stats:", dashboardStats);

  if (dashboardStats === undefined) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (dashboardStats === null) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load dashboard data</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const { stats, orderStats, recentOrders, topProducts } = dashboardStats;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                +15.3% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">+2 new this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Customers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Order Status Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Status Overview</CardTitle>
              <CardDescription>Current status of all orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">Pending</span>
                  </div>
                  <span className="text-sm font-bold">
                    {orderStats.pending}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Processing</span>
                  </div>
                  <span className="text-sm font-bold">
                    {orderStats.processing}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">Shipped</span>
                  </div>
                  <span className="text-sm font-bold">
                    {orderStats.shipped}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Delivered</span>
                  </div>
                  <span className="text-sm font-bold">
                    {orderStats.delivered}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">Cancelled</span>
                  </div>
                  <span className="text-sm font-bold">
                    {orderStats.cancelled}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>
                Best selling products this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.slice(0, 5).map((product, index) => (
                  <div
                    key={product.productId}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-600">
                          #{index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {product.product?.name || "Unknown Product"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.totalSold} sold
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-green-600">
                      ${product.revenue.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-muted-foreground py-8"
                    >
                      No recent orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  recentOrders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">
                        #{order.orderNumber}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {order.user?.firstName?.[0] || "U"}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">
                              {order.user?.firstName} {order.user?.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {order.user?.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(order._creationTime).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "delivered"
                              ? "default"
                              : order.status === "shipped"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : order.status === "shipped"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : order.status === "processing"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                  : order.status === "pending"
                                    ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${order.total.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewOrder(order)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Order Details Modal */}
      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order #{selectedOrder?.orderNumber} - {selectedOrder?.user?.email}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Order Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Order #
                      </span>
                      <span className="text-sm font-medium">
                        {selectedOrder.orderNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Date
                      </span>
                      <span className="text-sm font-medium">
                        {new Date(
                          selectedOrder._creationTime,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Status
                      </span>
                      <Badge
                        variant={
                          selectedOrder.status === "delivered"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {selectedOrder.status.charAt(0).toUpperCase() +
                          selectedOrder.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Total
                      </span>
                      <span className="text-sm font-bold">
                        ${selectedOrder.total.toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Customer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {selectedOrder.user?.firstName?.[0] || "U"}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {selectedOrder.user?.firstName}{" "}
                          {selectedOrder.user?.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {selectedOrder.user?.email}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Payment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Status
                      </span>
                      <Badge
                        variant={
                          selectedOrder.paymentStatus === "paid"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {selectedOrder.paymentStatus?.charAt(0).toUpperCase() +
                          selectedOrder.paymentStatus?.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Method
                      </span>
                      <span className="text-sm font-medium">Credit Card</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">
                      {selectedOrder.shippingAddress?.firstName}{" "}
                      {selectedOrder.shippingAddress?.lastName}
                    </p>
                    <p>{selectedOrder.shippingAddress?.address1}</p>
                    {selectedOrder.shippingAddress?.address2 && (
                      <p>{selectedOrder.shippingAddress.address2}</p>
                    )}
                    <p>
                      {selectedOrder.shippingAddress?.city},{" "}
                      {selectedOrder.shippingAddress?.state}{" "}
                      {selectedOrder.shippingAddress?.postalCode}
                    </p>
                    <p>{selectedOrder.shippingAddress?.country}</p>
                    {selectedOrder.shippingAddress?.phone && (
                      <p className="pt-1">
                        Phone: {selectedOrder.shippingAddress.phone}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Method */}
              {selectedOrder.deliveryMethod && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Truck className="h-5 w-5 mr-2" />
                      Delivery Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {selectedOrder.deliveryMethod.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedOrder.deliveryMethod.estimatedDays}
                        </p>
                      </div>
                      <p className="font-medium">
                        ${selectedOrder.deliveryMethod.price.toFixed(2)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Order Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedOrder.items?.map((item: any) => (
                      <div
                        key={item.productId || item.name}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            <Package className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {item.product?.name ||
                                `Product #${item.productId?.slice(-8) || "Unknown"}`}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ${item.total.toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Order Totals */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${selectedOrder.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${selectedOrder.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${selectedOrder.tax.toFixed(2)}</span>
                    </div>
                    {selectedOrder.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${selectedOrder.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => setIsOrderModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
