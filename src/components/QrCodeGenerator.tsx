import React, { useState, useEffect, useRef } from 'react';
// import { QRCodeSVG } from 'qrcode.react';
import QRCodeStyling, { Options, DrawType, DotType } from 'qr-code-styling';

interface QrCodeGeneratorProps {
    qrCodeUrl: string;
    setQrCodeUrl: (url: string) => void;
}

const initialOptions: Options = {
    width: 160,
    height: 160,
    type: 'svg' as DrawType,
    data: '',
    image: '',
    dotsOptions: {
        color: '#000000',
        type: 'square' as DotType,
    },
    cornersSquareOptions: {
        color: '#000000',
        type: 'square',
    },
    cornersDotOptions: {
        color: '#000000',
        type: 'square',
    },
    backgroundOptions: {
        color: '#ffffff',
    },
    imageOptions: {
        crossOrigin: 'anonymous',
        margin: 0,
    },
};

const dotStyleOptions: { type: DotType; svg: any }[] = [
    { type: 'square',
        svg: <svg width="37.5" height="37.5" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5,1h1l0-1L4,0v1H3V0L0,0v0v0v2h1V1h0h1h1v1v0v0l0,0H2v1H1H0h0v3h0v0h2v0H1l0-2h1l0,1h1v1h3v0H5v0V5h1V4H5v1H3 l0-2l1,0v1h1V3h1V2H5V1z M5,3H4V2h1V3z"></path>
        </svg>,
    },
    {
        type: 'dots',
        svg: <svg width="37.5" height="37.5" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg">
            <circle cx="0.5" cy="0.5" r="0.5"></circle>
            <circle cx="1.5" cy="0.5" r="0.5"></circle>
            <circle cx="3.5" cy="0.5" r="0.5"></circle>
            <circle cx="4.5" cy="0.5" r="0.5"></circle>
            <circle cx="0.5" cy="1.5" r="0.5"></circle>
            <circle cx="4.5" cy="1.5" r="0.5"></circle>
            <circle cx="5.5" cy="1.5" r="0.5"></circle>
            <circle cx="0.5" cy="2.5" r="0.5"></circle>
            <circle cx="1.5" cy="2.5" r="0.5"></circle>
            <circle cx="0.5" cy="3.5" r="0.5"></circle>
            <circle cx="1.5" cy="3.5" r="0.5"></circle>
            <circle cx="4.5" cy="3.5" r="0.5"></circle>
            <circle cx="5.5" cy="3.5" r="0.5"></circle>
            <circle cx="2.5" cy="4.5" r="0.5"></circle>
            <circle cx="1.5" cy="5.5" r="0.5"></circle>
            <circle cx="3.5" cy="5.5" r="0.5"></circle>
            <circle cx="5.5" cy="5.5" r="0.5"></circle>
        </svg>,
    },
    { type: 'rounded', svg: <svg width="37.5" height="37.5" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg"><path d="M2.5,3C2.8,3,3,2.8,3,2.5L3,2h1.5C4.8,2,5,1.8,5,1.5C5,1.2,4.8,1,4.5,1H4V0L2,0l0,2.5C2,2.8,2.2,3,2.5,3z M4,1 L4,1L4,1L4,1z"></path> <path d="M5.5,3C5.2,3,5,3.2,5,3.5S5.2,4,5.5,4C5.8,4,6,3.8,6,3.5S5.8,3,5.5,3z"></path> <path d="M0.5,1C0.8,1,1,0.8,1,0.5V0L0,0v0v0.5C0,0.8,0.2,1,0.5,1z"></path> <path d="M4,4L4,4L3,4l0,0v0C2.4,4,2,4.4,2,5h0H1V2.5C1,2.2,0.8,2,0.5,2S0,2.2,0,2.5V5h0c0,0.6,0.4,1,1,1h2v0V5h1v0h0v1 l1,0V5h0C5,4.4,4.6,4,4,4z"></path></svg> },
    {
        type: 'classy',
        svg: <svg width="37.5" height="37.5" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg"><path d="M5.2,4C5,4,4.9,4.3,5.1,4.5C5.3,4.8,5.6,5,5.8,5C6,5,6.1,4.7,5.9,4.5C5.7,4.2,5.4,4,5.2,4z"></path> <path d="M5,0.9C5,0.9,5.1,1,5.1,1H6V0C5.8,0,5,0.6,5,0.9z"></path> <path d="M5.9,2H4l0,0h0V1l0,0h0c0-0.2-0.6-1-0.9-1C3.1,0,3,0.1,3,0.1v2.5C3,2.9,3.1,3,3.3,3L5,3v0l0,0c0.2,0,1-0.6,1-0.9 C6,2.1,5.9,2,5.9,2z"></path> <path d="M3.7,4H2.3C2.1,4,2,4.1,2,4.3V5h0l0,0H1v0V4h0l0,0c0-0.2-0.6-1-0.9-1C0.1,3,0,3.1,0,3.1v2.5C0,5.9,0.1,6,0.3,6L4,6V4.3 C4,4.1,3.9,4,3.7,4z"></path> <path d="M0.1,1H1v0v1h0l0,0c0,0.2,0.6,1,0.9,1C1.9,3,2,2.9,2,2.9L2,0H1v0C0.8,0,0,0.6,0,0.9C0,0.9,0.1,1,0.1,1z"></path></svg>,
    },
    {
        type: 'classy-rounded',
        svg: <svg width="37.5" height="37.5" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg"><path d="M5.5,4C5.2,4,5,4.2,5,4.5S5.2,5,5.5,5C5.8,5,6,4.8,6,4.5S5.8,4,5.5,4z"></path> <path d="M0,2c0.6,0,1-0.4,1-1l1,0v0l0.2-0.1c0.2-0.1,0.4-0.1,0.6,0L3,1c0,0,0,0,0,0v0l0,0c0-0.6-0.4-1-1-1v0H0l0,1h0l0.1,0.2 c0.1,0.2,0.1,0.4,0,0.6L0,2z"></path> <path d="M4.5,3C4.2,3,4,3.2,4,3.5S4.2,4,4.5,4C4.8,4,5,3.8,5,3.5S4.8,3,4.5,3z"></path> <path d="M3,2L3,2L3,2l0.1,0.2c0.1,0.2,0.1,0.4,0,0.6L3,3c0.6,0,1-0.4,1-1l0,0h0h0.5C4.8,2,5,1.8,5,1.5V1l0.2-0.1 c0.2-0.1,0.4-0.1,0.6,0L6,1c0-0.6-0.4-1-1-1l0,0h0H4.5C4.2,0,4,0.2,4,0.5V1h0H3.5C3.2,1,3,1.2,3,1.5V2z"></path> <path d="M4,5L4,5L3,5v0h0l0-1.5C3,3.2,2.8,3,2.5,3l-1,0C1.2,3,1,3.2,1,3.5L1,4l0,0L0.8,4.1c-0.2,0.1-0.4,0.1-0.6,0L0,4 c0,0.6,0.4,1,1,1l0,0l1,0l0,0.5C2,5.8,2.2,6,2.5,6L4,6l0,0v0l0.2-0.1c0.2-0.1,0.4-0.1,0.6,0L5,6C5,5.4,4.6,5,4,5z"></path></svg>,
    },
    { type: 'extra-rounded', svg: <svg width="37.5" height="37.5" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg"><rect x="4.1" y="3.1" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -1.1563 4.2076)" width="0.7" height="0.7"></rect> <polygon points="1,1.5 1,1 1,1 2.5,1 3,0.5 2.5,0 0.5,0 0,0.5 0,1.5 0.5,2 "></polygon> <path d="M3,2"></path> <rect x="5.1" y="4.1" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -1.5707 5.2069)" width="0.7" height="0.7"></rect> <polygon points="0.5,3 0,3.5 0,5.5 0.5,6 1,5.5 1,4 2,4 2,5.5 2.5,6 4.5,6 5,5.5 4.5,5 3,5 3,3.5 2.5,3"></polygon> <polygon points="5.5,0 4.5,0 4,0.5 4,1 3.5,1 3,1.5 3,2.5 3.5,3 4,2.5 4,2 4.5,2 5,1.5 5,1 5.5,1 6,0.5"></polygon></svg> },
];

const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({
                                                             qrCodeUrl,
                                                             setQrCodeUrl,
                                                         }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
    const [options, setOptions] = useState<Options>(initialOptions);
    const [logoUrl, setLogoUrl] = useState('');

    useEffect(() => {
        const qr = new QRCodeStyling(initialOptions);
        setQrCode(qr);
        if (ref.current) {
            qr.append(ref.current);
        }

        return () => {
             if (ref.current) {
                 ref.current.innerHTML = '';
             }
        };
    }, [qrCodeUrl]);

    useEffect(() => {
        if (qrCode) {
            qrCode.update({
                ...options,
                data: qrCodeUrl,
                image: logoUrl
            });
        }
    }, [qrCode, qrCodeUrl, options, logoUrl]);

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQrCodeUrl(e.target.value);
    };

    const handleDotTypeSelect = (type: DotType) => {
        setOptions(prevOptions => ({
            ...prevOptions,
            dotsOptions: {
                ...prevOptions.dotsOptions,
                type: type,
            } as Options['dotsOptions'],
        }));
    };

     const handleLogoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogoUrl(e.target.value);
     };

    return (
        <div>
            <label htmlFor="qrCodeUrl" className="block text-sm font-medium text-gray-700 mb-2">Enter your
                destination URL</label>
            <input
                type="text"
                id="qrCodeUrl"
                value={qrCodeUrl}
                onChange={handleUrlChange}
                placeholder="请输入要生成二维码的链接"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
            />

            <div className="mt-6 p-4 border border-gray-200 rounded-md">
                <h3 className="text-lg font-bold mb-4">自定义样式</h3>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Shape Style</label>
                    <div className="flex flex-wrap gap-2">
                        {dotStyleOptions.map((option) => (
                            <button
                                key={option.type}
                                onClick={() => handleDotTypeSelect(option.type)}
                                className={`text-center bg-white border p-2 rounded-md ${options.dotsOptions?.type === option.type ? 'border-blue-500' : 'border-gray-300'} hover:border-blue-500`}
                            >
                                {option.svg}
                            </button>
                        ))}
                    </div>
                </div>

                 <div className="mb-4">
                    <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 mb-2">Logo 图片 URL</label>
                    <input
                        type="text"
                        id="logoUrl"
                        value={logoUrl}
                        onChange={handleLogoUrlChange}
                        placeholder="请输入 Logo 图片链接 (可选)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                    />
                 </div>

            </div>

            {qrCodeUrl && (
                <div className="mt-8 text-center">
                    <div className="mt-4" ref={ref}>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QrCodeGenerator;
