exports.charge = async ({ amount }) => {
  // simulate network delay
  await new Promise(r => setTimeout(r, 300));
  // simulate 95% success, 5% failure to test payment failure handling later
  if (Math.random() < 0.05) return { success: false, orderId: null };
  return { success: true, orderId: 'order-' + Date.now(), amount };
};
