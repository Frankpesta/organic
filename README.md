# Helen's Beauty Secret - Premium Organic Skincare E-commerce Platform

A modern, full-stack e-commerce platform built with Next.js 15, featuring Nike-level UI/UX design, comprehensive authentication, and advanced e-commerce functionality.

## 🚀 Features

### 🎨 Design & UX
- **Nike-level UI/UX** with premium design patterns
- **Deep green color scheme** for organic beauty branding
- **Manrope font** for modern, clean typography
- **Responsive design** optimized for all devices
- **Smooth animations** and micro-interactions
- **Accessibility-first** approach

### 🛒 E-commerce Functionality
- **Product catalog** with advanced filtering and search
- **Shopping cart** with persistent state management
- **Checkout process** with Stripe integration
- **Order management** and tracking
- **User profiles** and account management
- **Wishlist** functionality
- **Product reviews** and ratings

### 🔐 Authentication & Security
- **Clerk authentication** integration
- **Role-based access control** (Admin/User)
- **Protected routes** with middleware
- **Secure payment processing** with Stripe
- **Data validation** and sanitization

### 🌱 Organic Beauty Focus
- **Ingredient spotlight** pages
- **Sustainability** information
- **Clean beauty** messaging
- **Educational content** about organic skincare
- **Environmental impact** tracking

### 📱 Advanced Features
- **Purchasing Power Parity (PPP)** for international customers
- **Multi-currency support** with local pricing
- **SEO optimization** with structured data
- **Blog system** with content management
- **FAQ system** with search functionality
- **Contact forms** and support system

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** with App Router
- **React 19.1.0** with TypeScript
- **Tailwind CSS v4** for styling
- **shadcn/ui** component library
- **Zustand** for state management
- **GSAP** for animations
- **Lucide React** for icons

### Backend
- **Convex** as backend-as-a-service
- **Clerk** for authentication
- **Stripe** for payments
- **Real-time** data synchronization

### Development Tools
- **Biome** for linting and formatting
- **TypeScript** for type safety
- **Turbopack** for fast development

## 📁 Project Structure

```
organic/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Authentication pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── admin/                    # Admin dashboard
│   │   ├── products/
│   │   ├── orders/
│   │   └── customers/
│   ├── api/                      # API routes
│   │   └── stripe/
│   ├── blog/                     # Blog pages
│   ├── shop/                     # Product pages
│   ├── about/                    # About page
│   ├── contact/                  # Contact page
│   ├── faq/                      # FAQ page
│   ├── ingredients/              # Ingredients page
│   ├── sustainability/           # Sustainability page
│   ├── profile/                  # User profile
│   ├── checkout/                 # Checkout process
│   ├── order-success/            # Order confirmation
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── not-found.tsx             # 404 page
│   ├── sitemap.ts                # SEO sitemap
│   └── robots.ts                 # SEO robots.txt
├── components/                    # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── admin/                    # Admin components
│   ├── auth/                     # Authentication components
│   ├── Cart.tsx                  # Shopping cart
│   └── SEOHead.tsx               # SEO component
├── convex/                       # Convex backend
│   ├── schema.ts                 # Database schema
│   ├── products.ts               # Product functions
│   ├── orders.ts                 # Order functions
│   ├── cart.ts                   # Cart functions
│   └── admin.ts                  # Admin functions
├── lib/                          # Utility libraries
│   ├── stores/                   # Zustand stores
│   ├── seo.ts                    # SEO utilities
│   ├── ppp.ts                    # PPP calculations
│   └── stripe.ts                 # Stripe configuration
├── middleware.ts                 # Route protection
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Convex account
- Clerk account
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd organic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Convex Backend
   CONVEX_DEPLOYMENT=your_convex_deployment
   
   # Stripe Payments
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. **Set up Convex**
   ```bash
   npx convex dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Color Palette
- **Primary Green**: Deep, sophisticated green tones
- **Secondary**: Complementary earth tones
- **Accent**: Warm, organic colors
- **Neutral**: Clean grays and whites

### Typography
- **Primary Font**: Manrope (Google Fonts)
- **Weights**: 200, 300, 400, 500, 600, 700, 800
- **Responsive**: Fluid typography scaling

### Components
- **Buttons**: Multiple variants with hover states
- **Cards**: Elevated with subtle shadows
- **Forms**: Clean, accessible input fields
- **Navigation**: Intuitive, mobile-friendly
- **Modals**: Smooth, accessible overlays

## 🔧 Configuration

### Stripe Setup
1. Create a Stripe account
2. Get your API keys from the dashboard
3. Set up webhooks for payment processing
4. Configure webhook endpoints in your Stripe dashboard

### Clerk Setup
1. Create a Clerk account
2. Set up your application
3. Configure authentication providers
4. Set up user metadata for roles

### Convex Setup
1. Create a Convex project
2. Deploy your schema
3. Set up your database tables
4. Configure authentication

## 📱 Pages Overview

### Public Pages
- **Homepage**: Hero section, featured products, brand story
- **Shop**: Product catalog with filtering and search
- **Product Details**: Individual product pages with reviews
- **About**: Company story and team information
- **Ingredients**: Ingredient spotlight and education
- **Sustainability**: Environmental commitment
- **Contact**: Contact form and support information
- **FAQ**: Frequently asked questions
- **Blog**: Beauty tips and educational content

### Protected Pages
- **Profile**: User account management
- **Checkout**: Secure payment process
- **Order Success**: Order confirmation
- **Admin Dashboard**: Product and order management

## 🛡️ Security Features

- **Authentication**: Secure user authentication with Clerk
- **Authorization**: Role-based access control
- **Data Validation**: Input sanitization and validation
- **Payment Security**: PCI-compliant payment processing
- **HTTPS**: Secure data transmission
- **CSRF Protection**: Cross-site request forgery protection

## 🚀 Performance Optimizations

- **Next.js 15**: Latest framework features
- **Turbopack**: Fast development builds
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic code splitting
- **Caching**: Strategic caching strategies
- **SEO**: Optimized for search engines

## 📊 Analytics & Tracking

- **User Analytics**: Track user behavior
- **E-commerce Analytics**: Sales and conversion tracking
- **Performance Monitoring**: Core Web Vitals
- **Error Tracking**: Application error monitoring

## 🌍 Internationalization

- **Multi-currency**: Support for multiple currencies
- **PPP**: Purchasing Power Parity adjustments
- **Localization**: Country-specific pricing
- **Language Support**: Ready for multiple languages

## 🧪 Testing

- **Unit Tests**: Component testing
- **Integration Tests**: API testing
- **E2E Tests**: End-to-end testing
- **Performance Tests**: Load testing

## 📈 SEO Features

- **Structured Data**: JSON-LD markup
- **Meta Tags**: Dynamic meta tag generation
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine directives
- **Open Graph**: Social media optimization
- **Twitter Cards**: Twitter optimization

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Static site deployment
- **AWS**: Full-stack deployment
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- **Email**: support@helensbeautysecret.com
- **Documentation**: [Link to docs]
- **Issues**: [GitHub Issues]

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for hosting and deployment
- **Clerk** for authentication
- **Convex** for backend services
- **Stripe** for payment processing
- **shadcn/ui** for beautiful components

---

Built with ❤️ for organic beauty enthusiasts