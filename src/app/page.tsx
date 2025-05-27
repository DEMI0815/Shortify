'use client';

import { useState } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortId, setShortId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!url) {
      toast.error('请输入原始链接');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('/api/shorten', { originalUrl: url });
      setShortId(res.data.shortId);
      toast.success('短链生成成功！');
    } catch (e) {
      toast.error('生成失败');
    }
    setLoading(false);
  };

  const shortUrl = shortId ? `http://localhost:3000/api/${shortId}` : '';

  return (
    <div style={{ maxWidth: 480, margin: '60px auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
      <Toaster />
      <h2>短链生成器</h2>
      <input
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="请输入原始链接"
        style={{ width: '100%', padding: 8, marginBottom: 12, fontSize: 16 }}
      />
      <button onClick={handleShorten} disabled={loading} style={{ width: '100%', padding: 10, fontSize: 16 }}>
        {loading ? '生成中...' : '生成短链'}
      </button>
      {shortId && (
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <div>
            <span>短链：</span>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
          </div>
          <div style={{ marginTop: 16 }}>
            <QRCodeSVG value={shortUrl} size={160} />
            <div style={{ marginTop: 8, color: '#888' }}>扫码访问短链</div>
          </div>
        </div>
      )}
    </div>
  );
}