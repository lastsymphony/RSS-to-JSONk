const Parser = require('rss-parser');
const parser = new Parser({
  headers: { 'User-Agent': 'Mozilla/5.0 (Node.js RSS Parser)' }
});

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET allowed' });
  }

  const { feedURL } = req.query;
  if (!feedURL) {
    return res.status(400).json({ error: 'feedURL is required' });
  }

  try {
    const feed = await parser.parseURL(feedURL);
    res.status(200).json(feed);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch RSS' });
  }
};
