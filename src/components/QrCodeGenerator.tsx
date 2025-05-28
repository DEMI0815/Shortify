import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QrCodeGeneratorProps {
    qrCodeUrl: string;
    setQrCodeUrl: (url: string) => void;
}

const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({
                                                             qrCodeUrl,
                                                             setQrCodeUrl,
                                                         }) => {
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default QrCodeGenerator;
