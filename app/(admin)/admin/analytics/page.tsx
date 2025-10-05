"use client";

import { useQuery } from "convex/react";
import {
  Calendar,
  DollarSign,
  Download,
  Package,
  RefreshCw,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart";
import { api } from "@/convex/_generated/api";
import {
  generateCustomerGrowthData,
  generateOrderStatusData,
  generateOrderTrendsData,
  generateRevenueData,
  generateTopProductsData,
} from "@/lib/analytics-data";

export default function AnalyticsPage() {
  const dashboardStats = useQuery(api.admin.getDashboardStats);

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
          <p className="text-red-600 mb-4">Failed to load analytics data</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const { stats, orderStats, topProducts } = dashboardStats;

  // Generate chart data
  const revenueData = generateRevenueData();
  const orderTrendsData = generateOrderTrendsData();
  const topProductsData = generateTopProductsData(topProducts);
  const orderStatusData = generateOrderStatusData(orderStats);
  const _customerGrowthData = generateCustomerGrowthData();

  // Chart configurations
  const revenueConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-1))",
    },
    orders: {
      label: "Orders",
      color: "hsl(var(--chart-2))",
    },
  };

  const orderTrendsConfig = {
    orders: {
      label: "Orders",
      color: "hsl(var(--chart-1))",
    },
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-2))",
    },
  };

  const topProductsConfig = topProductsData.map((_, index) => ({
    name: topProductsData[index]?.name || `Product ${index + 1}`,
    color: `hsl(var(--chart-${(index % 5) + 1}))`,
  }));

  const orderStatusConfig = orderStatusData.map((item) => ({
    name: item.name,
    color: item.color,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            Track your business performance and insights
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -2.1% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3 new this month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Monthly revenue for the past 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={revenueConfig} className="h-80">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={revenueConfig.revenue.color}
                  fill={revenueConfig.revenue.color}
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Orders Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Order Trends</CardTitle>
            <CardDescription>Daily orders for the past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={orderTrendsConfig} className="h-80">
              <LineChart data={orderTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip content={<ChartTooltip />} />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke={orderTrendsConfig.orders.color}
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Revenue by product this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={topProductsConfig} className="h-80">
              <BarChart data={topProductsData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="revenue" fill={topProductsConfig[0]?.color} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Order Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
            <CardDescription>Current status of all orders</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={orderStatusConfig} className="h-80">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orderStatusData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ChartContainer>
            <ChartLegend config={orderStatusConfig} className="mt-4" />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>
              Best performing products this month
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
                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                      <span className="text-sm font-bold text-foreground">
                        #{index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {product.product?.name || "Unknown Product"}
                      </p>
                      <p className="text-xs text-muted-foreground">
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

        {/* Order Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
            <CardDescription>Current status of all orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium">Pending</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold">
                    {orderStats.pending}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    (
                    {((orderStats.pending / stats.totalOrders) * 100).toFixed(
                      1,
                    )}
                    %)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold">
                    {orderStats.processing}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    (
                    {(
                      (orderStats.processing / stats.totalOrders) *
                      100
                    ).toFixed(1)}
                    %)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium">Shipped</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold">
                    {orderStats.shipped}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    (
                    {((orderStats.shipped / stats.totalOrders) * 100).toFixed(
                      1,
                    )}
                    %)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Delivered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold">
                    {orderStats.delivered}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    (
                    {((orderStats.delivered / stats.totalOrders) * 100).toFixed(
                      1,
                    )}
                    %)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">Cancelled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold">
                    {orderStats.cancelled}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    (
                    {((orderStats.cancelled / stats.totalOrders) * 100).toFixed(
                      1,
                    )}
                    %)
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
