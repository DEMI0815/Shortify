import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';

interface QrCodeGeneratorProps {
    qrCodeUrl: string;
    setQrCodeUrl: (url: string) => void;
}

const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({
                                                             qrCodeUrl,
                                                             setQrCodeUrl,
                                                         }) => {

    const handleGenerateQrCode = () => {
        if (!qrCodeUrl) {
            toast.error('请输入要生成二维码的链接');
            return;
        }
        // 二维码直接使用输入的 URL
        // QRCodeSVG 组件可以直接使用 qrCodeUrl
    };

    return (
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
    );
};

export default QrCodeGenerator;
