import ShortUrl from '../models/ShortUrl.js';
import { nanoid } from 'nanoid';
import { Router, Request, Response } from 'express';

const router = Router();

// 生成短链
router.post('/shorten', (req: Request, res: Response) => {
  (async () => {
    const { originalUrl } = req.body;
    if (!originalUrl) return res.status(400).json({ error: '缺少原始链接' });

    const shortId = nanoid(6);
    await ShortUrl.create({ shortId, originalUrl });
    res.json({ shortId, originalUrl });
  })().catch(err => {
    res.status(500).json({ error: err.message });
  });
});

// 跳转短链
router.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const shortUrl = await ShortUrl.findOne({ shortId });
  if (shortUrl) {
    shortUrl.clicks += 1;
    await shortUrl.save();
    res.redirect(shortUrl.originalUrl);
  } else {
    res.status(404).send('Not found');
  }
});

// 获取统计
router.get('/stats/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const shortUrl = await ShortUrl.findOne({ shortId });
  if (shortUrl) {
    res.json({ clicks: shortUrl.clicks, createdAt: shortUrl.createdAt });
  } else {
    res.status(404).send('Not found');
  }
});

export default router;