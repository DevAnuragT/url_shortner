const { nanoid } = require('nanoid');
const Url = require('../models/url');

async function generateShortUrl(req, res) {
    const { url } = req.body; // Destructure correctly

    if (!url) {
        return res.status(400).json({ message: 'Url is required' });
    }

    const shortId = nanoid(8);
    await Url.create({
        shortId,
        redirectUrl: url, // Use "url" from request body
        visitHistory: []
    });

    return res.status(201).json({ shortId });
}

module.exports = { generateShortUrl };