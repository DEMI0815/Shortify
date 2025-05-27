import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import shortenRouter from '../routes/shorten.js';

const app = express();
app.use(express.json());
app.use('/api', shortenRouter);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/shortify_test');
});

afterAll(async () => {
  await mongoose.connection.db!.dropDatabase();
  await mongoose.disconnect();
});

describe('短链接口测试', () => {
  let shortId = '';

  it('生成短链', async () => {
    const res = await request(app)
      .post('/api/shorten')
      .send({ originalUrl: 'https://www.baidu.com' });
    expect(res.body.shortId).toBeDefined();
    shortId = res.body.shortId;
  });

  it('访问短链并跳转', async () => {
    const res = await request(app).get(`/api/${shortId}`);
    expect(res.status).toBe(302); // 302 跳转
  });

  it('查看统计', async () => {
    const res = await request(app).get(`/api/stats/${shortId}`);
    expect(res.body.clicks).toBeGreaterThanOrEqual(1);
    expect(res.body.createdAt).toBeDefined();
  });
});