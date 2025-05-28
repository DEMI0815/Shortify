import React, { useState } from 'react';

const Header: React.FC = () => {
    const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);

    const handleEmailClick = () => {
        setIsEmailDialogOpen(true);
    };

    const handleGithubClick = () => {
        window.open('https://github.com/DEMI0815/Shortify', '_blank');
    };

    const closeEmailDialog = () => {
        setIsEmailDialogOpen(false);
    };

    return (
        <>
            <header className="flex justify-between items-center p-4 bg-white shadow-sm">
                <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-800">Shortify</span>
                </div>
                <div className="flex items-center space-x-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 cursor-pointer" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor" onClick={handleEmailClick}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 cursor-pointer"
                         fill="currentColor" viewBox="0 0 24 24" onClick={handleGithubClick}>
                        <path
                            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.542-1.37-1.322-1.735-1.322-1.735-1.085-.74.08-.725.08-.725 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.49.997.107-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1-.322 3.3 1.22.96-.267 1.98-.4 3-.4.92 0 1.94.133 3 .4 2.3-.942 3.3-1.22 3.3-1.22.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.802 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .32.21.693.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z"/>
                    </svg>
                </div>
            </header>

            {isEmailDialogOpen && (
                <div className="fixed inset-0 bg-gray-600 opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl relative">
                        <h3 className="text-lg font-bold mb-4">我的邮箱</h3>
                        <p className="mb-6">yidi.zhao@thoughtworks.com</p>
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={closeEmailDialog}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
