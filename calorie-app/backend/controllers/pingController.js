export const ping = (req, res) => {
  return res.json({ status: 'ok', timestamp: Date.now() });
};
