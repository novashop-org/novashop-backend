let CART = [];

exports.getCart = (req, res) => {
  res.json(CART);
};

exports.addToCart = (req, res) => {
  const { productId, qty = 1 } = req.body;
  if (!productId) return res.status(400).json({ error: 'productId required' });
  CART.push({ productId, qty });
  res.status(201).json({ message: 'added', cart: CART });
};

exports.clearCart = (req, res) => {
  CART = [];
  res.json({ message: 'cleared' });
};
