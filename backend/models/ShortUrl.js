import mongoose from 'mongoose';

const shortUrlSchema = new mongoose.Schema({
  shortId: { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

export default ShortUrl;
