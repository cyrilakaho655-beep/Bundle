const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuid } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// In-memory demo data (replace with a real DB in production)
let plans = [
  { id: 'plan_basic', title: '1GB', price: 1.5, currency: 'GHS', validityDays: 7, description: '1GB data for 7 days' },
  { id: 'plan_standard', title: '3GB', price: 3.5, currency: 'GHS', validityDays: 30, description: '3GB data for 30 days' },
  { id: 'plan_premium', title: '10GB', price: 10.0, currency: 'GHS', validityDays: 30, description: '10GB data for 30 days' }
];

let orders = [];

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/plans', (req, res) => {
  res.json(plans);
});

app.post('/api/orders', (req, res) => {
  const { userId = 'guest', planId, paymentMethod = 'paystack' } = req.body || {};
  const plan = plans.find(p => p.id === planId);
  if (!plan) return res.status(400).json({ error: 'Plan not found' });

  const order = {
    id: uuid(),
    userId,
    planId,
    amount: plan.price,
    currency: plan.currency,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  orders.push(order);

  // Simulated payment response (in real app you'd create a payment intent/session)
  res.json({
    order,
    payment: {
      provider: paymentMethod,
      redirect_url: `https://example.com/pay/${order.id}`
    }
  });
});

// Simple webhook simulator for demo/testing
app.post('/api/payments/webhook', (req, res) => {
  const { orderId, status = 'success' } = req.body || {};
  const order = orders.find(o => o.id === orderId);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  order.status = status === 'success' ? 'paid' : 'failed';
  order.paidAt = new Date().toISOString();

  return res.json({ ok: true, order });
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  return res.json(order);
});

app.listen(PORT, () => {
  console.log(`Whally backend (demo) listening on http://localhost:${PORT}`);
});
