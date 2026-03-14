import React from 'react';

function Ticker() {
    return (
        <div className="ticker-wrap no-print">
            <div className="ticker-content">
                <span className="ticker-item">🚀 NIFTY 50: <span className="text-green">22,140.40 (+1.2%)</span></span>
                <span className="ticker-item">🇺🇸 S&P 500: <span className="text-green">5,020.30 (+0.8%)</span></span>
                <span className="ticker-item">💎 GOLD: <span className="text-yellow">₹62,450 (-0.2%)</span></span>
                <span className="ticker-item">📈 SIP INFLOWS: <span className="text-teal">₹18,838 Cr (ATH)</span></span>
            </div>
        </div>
    );
}

export default Ticker;
