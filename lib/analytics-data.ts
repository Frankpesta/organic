// Sample data generation for analytics charts

export const generateRevenueData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map((month, index) => ({
    month,
    revenue: Math.floor(Math.random() * 50000) + 20000,
    orders: Math.floor(Math.random() * 200) + 50,
  }));
};

export const generateOrderTrendsData = () => {
  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });
  
  return days.map((day, index) => ({
    day,
    orders: Math.floor(Math.random() * 20) + 5,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  }));
};

export const generateTopProductsData = (products: any[]) => {
  return products.slice(0, 5).map((product, index) => ({
    name: product.product?.name || `Product ${index + 1}`,
    sales: product.totalSold || Math.floor(Math.random() * 100) + 10,
    revenue: product.revenue || Math.floor(Math.random() * 5000) + 1000,
  }));
};

export const generateOrderStatusData = (orderStats: any) => {
  return [
    { name: 'Pending', value: orderStats.pending, color: '#eab308' },
    { name: 'Processing', value: orderStats.processing, color: '#3b82f6' },
    { name: 'Shipped', value: orderStats.shipped, color: '#8b5cf6' },
    { name: 'Delivered', value: orderStats.delivered, color: '#22c55e' },
    { name: 'Cancelled', value: orderStats.cancelled, color: '#ef4444' },
  ];
};

export const generateCustomerGrowthData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map((month, index) => ({
    month,
    customers: Math.floor(Math.random() * 100) + 200 + (index * 20),
    newCustomers: Math.floor(Math.random() * 50) + 20,
  }));
};
