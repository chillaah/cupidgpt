const mturkService = require('../services/mturkService');

exports.fetchResults = async (req, res) => {
    const { hitId } = req.body;
    if (!hitId) {
        return res.status(400).json({ error: 'HIT ID is required' });
    }

    try {
        const results = await mturkService.getMTurkResults(hitId);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch MTurk results' });
    }
};
