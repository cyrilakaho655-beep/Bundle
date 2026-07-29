# Whally 🗯️ - Mobile Data Bundles Platform

A modern, full-stack e-commerce platform for selling mobile data bundles in Ghana. Built with accessibility, performance, and user experience in mind.

## Features

✨ **Core Features**
- 📱 Responsive design optimized for mobile
- 💳 Multiple payment gateways (Stripe, Paystack)
- 🌍 Multi-language support (English, Twi, Hausa)
- 🔐 Secure authentication with JWT
- 📊 Admin dashboard for order tracking and analytics
- 🛍️ Dynamic pricing and plan management
- 💾 Offline-first PWA support

♿ **Accessibility**
- WCAG 2.1 AA compliance
- Screen reader optimization
- Keyboard navigation
- High contrast mode support
- Semantic HTML

🚀 **Performance**
- Server-side rendering with Next.js
- Optimized images and lazy loading
- Database query optimization
- Redis caching layer

📈 **Analytics**
- Google Analytics integration
- Custom event tracking
- Conversion funnel analysis
- User behavior insights

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query + Zustand
- **UI Components**: Radix UI (accessible)
- **Internationalization**: next-i18next
- **PWA**: Workbox

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Caching**: Redis
- **Authentication**: JWT
- **Payment**: Stripe & Paystack APIs
- **Email**: SendGrid
- **Validation**: Zod

## Project Structure

```
whally/
├── packages/
│   ├── frontend/          Next.js application
│   │   ├── app/           App Router pages
│   │   ├── components/    Reusable React components
│   │   ├── hooks/         Custom React hooks
│   │   ├── lib/           Utilities and helpers
│   │   ├── public/        Static assets
│   │   └── styles/        Global styles
│   │
│   └── backend/           Express.js API
│       ├── src/
│       │   ├── routes/    API endpoints
│       │   ├── models/    Mongoose schemas
│       │   ├── controllers/ Route handlers
│       │   ├── middleware/ Auth, validation
│       │   ├── services/  Business logic
│       │   └── config/    Configuration
│       └── tests/         Test suites
│
├── docker-compose.yml     Development environment
├── .env.example           Environment template
└── README.md             This file
```

## Getting Started

### Prerequisites
- Node.js 18+ and Yarn
- Docker and Docker Compose
- MongoDB (or use Docker)
- Stripe/Paystack account for payments

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/serkelwhally-a11y/Whally.git
   cd Whally
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

4. **Start development environment**
   ```bash
   # Using Docker (recommended)
   docker-compose up -d

   # Start dev servers
   yarn dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Admin Dashboard: http://localhost:3000/admin

## API Documentation

### Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
```

### Plans
```
GET /api/plans                 # List all plans
GET /api/plans/:id             # Get plan details
POST /api/plans                # Create plan (admin)
PUT /api/plans/:id             # Update plan (admin)
DELETE /api/plans/:id          # Delete plan (admin)
```

### Orders
```
GET /api/orders                # List user orders
POST /api/orders               # Create order
GET /api/orders/:id            # Get order details
PUT /api/orders/:id/status     # Update order status (admin)
```

### Payments
```
POST /api/payments/stripe/webhook    # Stripe webhook
POST /api/payments/paystack/webhook  # Paystack webhook
```

### Users (Admin)
```
GET /api/users                 # List all users
GET /api/users/:id             # Get user details
PUT /api/users/:id             # Update user
DELETE /api/users/:id          # Delete user
```

## Features in Detail

### 1. Dynamic Plan Management
Plans are fetched from the API, allowing real-time pricing and availability updates without redeploying.

### 2. Secure Payment Processing
- Stripe for international payments
- Paystack for local Ghanaian transactions
- PCI-DSS compliance
- Webhook handlers for payment confirmation

### 3. User Authentication
- Secure JWT token generation
- Refresh token rotation
- Role-based access control (User, Admin, Vendor)

### 4. Order Management System
- Real-time order status tracking
- Automatic delivery notifications
- Order history and receipts

### 5. Admin Dashboard
- Sales analytics and revenue reports
- Customer management
- Plan configuration
- User activity logs

### 6. Internationalization
Supported languages:
- English
- Twi (Akan)
- Hausa

Switch languages in settings or auto-detect based on browser locale.

### 7. Progressive Web App (PWA)
- Offline order history
- Push notifications for order updates
- Installable on mobile home screen
- Cached assets for faster loading

### 8. Accessibility Features
- Keyboard-only navigation
- Screen reader support via ARIA
- High contrast mode
- Focus indicators
- Semantic HTML5
- Alt text for all images

## Deployment

### Docker Deployment
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d
```

### Cloud Deployment (Vercel + Heroku)

**Frontend (Vercel):**
```bash
vercel deploy
```

**Backend (Heroku):**
```bash
heroku login
heroku create whally-api
git push heroku main
```

## Environment Variables

See `.env.example` for all required variables.

### Key Variables
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for signing tokens
- `STRIPE_SECRET_KEY` - Stripe API key
- `PAYSTACK_SECRET_KEY` - Paystack API key
- `SENDGRID_API_KEY` - Email service
- `NEXT_PUBLIC_API_URL` - Backend API URL

## Testing

```bash
# Run all tests
yarn test

# Run specific workspace tests
yarn workspace @whally/backend test
yarn workspace @whally/frontend test

# Watch mode
yarn test --watch

# Coverage report
yarn test --coverage
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Code Style

- ESLint for linting
- Prettier for formatting
- TypeScript for type safety

```bash
# Format code
yarn format

# Lint code
yarn lint

# Fix linting issues
yarn lint --fix
```

## Performance Metrics

Target Web Vitals:
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

## Security

- HTTPS only in production
- CORS properly configured
- Rate limiting on API endpoints
- Input validation and sanitization
- SQL/NoSQL injection prevention
- XSS protection via Content Security Policy

## Roadmap

- [ ] SMS notifications for orders
- [ ] Voice-based ordering (Twilio)
- [ ] Blockchain-based payment verification
- [ ] AR product visualization
- [ ] Subscription plans
- [ ] Referral program
- [ ] Multi-currency support

## License

MIT License - see LICENSE file

## Support

For issues and questions:
- GitHub Issues: [Report a bug](https://github.com/serkelwhally-a11y/Whally/issues)
- Email: support@whally.com

## Acknowledgments

Built with ❤️ by the Whally team in Ghana 🇬🇭

---

**Status**: 🚀 Production Ready | **Last Updated**: 2026-07-29
