const { Schema, model } = require('mongoose');

const paymentEventSchema = new Schema({
  eventId: { type: String, required: true, unique: true },
  provider: { type: String, required: true },
  raw: { type: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('PaymentEvent', paymentEventSchema);
