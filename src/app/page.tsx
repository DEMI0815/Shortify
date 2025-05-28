'use client';

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
import ShortenForm from '../components/ShortenForm';
import QrCodeGenerator from '../components/QrCodeGenerator';

export default function Home() {
    const [url, setUrl] = useState('');
    const [shortId, setShortId] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('shorten');
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    return (
        <div className="min-h-screen bg-gray-100">
            <Header/>
            <div className="max-w-2xl mx-auto mt-16 p-6 border border-gray-200 rounded-lg shadow-md bg-white">
                <Toaster/>
                <h2 className="text-2xl font-bold mb-4">Quick create</h2>
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
                    <ShortenForm
                        url={url}
                        setUrl={setUrl}
                        shortId={shortId}
                        setShortId={setShortId}
                        loading={loading}
                        setLoading={setLoading}
                    />
                )}

                {activeTab === 'qrcode' && (
                    <QrCodeGenerator
                        qrCodeUrl={qrCodeUrl}
                        setQrCodeUrl={setQrCodeUrl}
                    />
                )}
            </div>
        </div>
    );
}