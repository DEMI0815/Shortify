import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ShortenFormProps {
    url: string;
    setUrl: (url: string) => void;
    shortId: string;
    setShortId: (shortId: string) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const ShortenForm: React.FC<ShortenFormProps> = ({
                                                     url,
                                                     setUrl,
                                                     shortId,
                                                     setShortId,
                                                     loading,
                                                     setLoading,
                                                 }) => {
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

    const shortUrl = shortId ? `${process.env.NEXT_PUBLIC_API_URL}/api/${shortId}` : '';

    return (
        <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">Enter your
                destination
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
                    className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                {loading ? '生成中...' : 'Create your Shortify code'}
            </button>

            {shortId && (
                <div className="mt-8 text-center">
                    <div className="text-gray-700">
                        <span>Shortify：</span>
                        <a href={shortUrl} target="_blank" rel="noopener noreferrer"
                           className="text-blue-600 hover:underline">{shortId}</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShortenForm;
