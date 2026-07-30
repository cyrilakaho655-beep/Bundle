const express = require('express');
const { v4: uuid } = require('uuid');
const Plan = require('../models/Plan');
const Order = require('../models/Order');
const { authMiddleware, requireRole } = require('../middleware/auth');
const { initializeTransaction } = require('../services/paystack');

const router = express.Router();

// Public: list plans
router.get('/', async (req, res) => {
  const plans = await Plan.find({ active: true }).sort({ createdAt: 1 }).lean();
  res.json(plans);
});

// Admin create plan
router.post('/', authMiddleware, requireRole('Admin'), async (req, res) => {
  const { id, title, description, price, currency = 'GHS', validityDays = 30 } = req.body;
  if (!id || !title || !price) return res.status(400).json({ error: 'id, title and price required' });
  try {
    const p = new Plan({ id, title, description, price, currency, validityDays });
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin update plan
router.put('/:id', authMiddleware, requireRole('Admin'), async (req, res) => {
  try {
    const updates = req.body || {};
    const plan = await Plan.findOneAndUpdate({ id: req.params.id }, updates, { new: true });
    if (!plan) return res.status(404).json({ error: 'Plan not found' });
    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin delete plan
router.delete('/:id', authMiddleware, requireRole('Admin'), async (req, res) => {
  try {
    const plan = await Plan.findOneAndDelete({ id: req.params.id });
    if (!plan) return res.status(404).json({ error: 'Plan not found' });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create order (guest or authenticated)
router.post('/orders', async (req, res) => {
  const { userId = null, planId, paymentMethod = 'paystack', callback_url } = req.body || {};
  if (!planId) return res.status(400).json({ error: 'planId required' });

  const plan = await Plan.findOne({ id: planId });
  if (!plan) return res.status(404).json({ error: 'Plan not found' });

  const orderId = uuid();
  const order = new Order({ orderId, userId, planId: plan.id, amount: plan.price, currency: plan.currency, status: 'pending', paymentProvider: paymentMethod });
  await order.save();

  // If Paystack is selected and callback_url provided, initialize transaction
  if (paymentMethod === 'paystack') {
    try {
      // initializeTransaction will throw if PAYSTACK_SECRET_KEY not set
      const data = await initializeTransaction({ email: (req.body.email || 'guest@whally.local'), amount: order.amount, reference: order.orderId, callback_url });
      return res.json({ order, payment: { provider: 'paystack', ...data } });
    } catch (err) {
      console.warn('Paystack init skipped/failed:', err.message || err);
      // fall through and return order with placeholder payment
      return res.json({ order, payment: { provider: paymentMethod, redirect_url: `https://example.com/pay/${orderId}`, error: err.message } });
    }
  }

  // Default: return placeholder redirect
  res.json({ order, payment: { provider: paymentMethod, redirect_url: `https://example.com/pay/${orderId}` } });
});

// Webhook endpoint for payments (generic)
router.post('/payments/webhook', async (req, res) => {
  const { orderId, status = 'success' } = req.body || {};
  if (!orderId) return res.status(400).json({ error: 'orderId required' });

  const order = await Order.findOne({ orderId });
  if (!order) return res.status(404).json({ error: 'Order not found' });

  order.status = status === 'success' ? 'paid' : 'failed';
  if (order.status === 'paid') order.paidAt = new Date();
  await order.save();

  return res.json({ ok: true, order });
});

router.get('/orders/:orderId', async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.orderId }).lean();
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

module.exports = router;
