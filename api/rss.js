const Feed = require('rss-to-json');

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET requests allowed' });
  }

  const { feedURL } = req.query;

  if (!feedURL) {
    return res.status(400).json({ error: 'feedURL is required' });
  }

  try {
    const rss = await Feed.load(feedURL);
    res.status(200).json(rss);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch RSS feed' });
  }
};
