'use client';

import { useState } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
    const [url, setUrl] = useState('');
    const [shortId, setShortId] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('shorten');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
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
            console.error(e);
            toast.error('生成失败');
        }
        setLoading(false);
    };

    const handleGenerateQrCode = () => {
        if (!qrCodeUrl) {
            toast.error('请输入要生成二维码的链接');
            return;
        }
    };

    const shortUrl = shortId ? `${process.env.NEXT_PUBLIC_API_URL}/api/${shortId}` : '';

    return (
        <div className="max-w-md mx-auto mt-16 p-6 border border-gray-200 rounded-lg shadow-md bg-white">
            <Toaster/>
            <h2 className="text-2xl font-bold mb-4">短链/二维码生成器</h2>
            <div className="flex mb-6 border-b border-gray-200">
                <button
                    className={`px-4 py-2 text-sm font-medium ${activeTab === 'shorten' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('shorten')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M13.64 21.97l-1.932-1.932A6 6 0 0111 15v-2a1 1 0 00-1-1H7a1 1 0 00-1 1v3a6 6 0 01-2.414 4.756l-.965.965M10.36 2.03L12.292 3.96a6 6 0 011.414 8.415V13a1 1 0 001 1h3a1 1 0 001-1v-3a6 6 0 012.414-4.756l.965-.965"/>
                    </svg>
                    Short link
                </button>
                <button
                    className={`px-4 py-2 text-sm font-medium ${activeTab === 'qrcode' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('qrcode')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M qr code icon path here"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M4 8V4a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2zM8 4v4h4V4H8z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M16 8V4a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2zM20 4v4h4V4h-4z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M4 20v-4a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2zM8 16v4h4v-4H8z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M16 20v-4a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2zM20 16v4h4v-4h-4z"/>
                        <circle cx="12" cy="12" r="2"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    QR Code
                </button>
            </div>

            {activeTab === 'shorten' && (
                <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">Enter your destination
                        URL</label>
                    <input
                        type="text"
                        id="url"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        placeholder="https://example.com/my-long-url"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                    />
                    <button onClick={handleShorten} disabled={loading}
                            className="w-full mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        {loading ? '生成中...' : 'Create your Bitly code'}
                    </button>

                    {shortId && (
                        <div className="mt-8 text-center">
                            <div className="text-gray-700">
                                <span>短链：</span>
                                <a href={shortUrl} target="_blank" rel="noopener noreferrer"
                                   className="text-blue-600 hover:underline">{shortId}</a>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'qrcode' && (
                <div>
                    <label htmlFor="qrCodeUrl" className="block text-sm font-medium text-gray-700 mb-2">Enter your
                        destination URL</label>
                    <input
                        type="text"
                        id="qrCodeUrl"
                        value={qrCodeUrl}
                        onChange={e => setQrCodeUrl(e.target.value)}
                        placeholder="请输入要生成二维码的链接"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                    />

                    {qrCodeUrl && (
                        <div className="mt-8 text-center">
                            <div className="mt-4">
                                <QRCodeSVG value={qrCodeUrl} size={160}/>
                                <div className="mt-2 text-gray-500 text-sm">扫码访问</div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}