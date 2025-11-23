const payment = require('../services/paymentSimulator');

exports.processCheckout = async (req, res) => {
  const { cart } = req.body;
  if (!cart || !cart.length) return res.status(400).json({ error: 'empty cart' });

  // compute total (expects items with price & qty)
  const total = cart.reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0);

  // simulate a payment provider call
  const result = await payment.charge({ amount: total });
  if (!result || !result.success) return res.status(402).json({ error: 'payment failed' });

  // return simple success + order id
  res.json({ message: 'order placed', orderId: result.orderId, amount: result.amount });
};
