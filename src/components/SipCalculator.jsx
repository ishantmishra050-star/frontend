import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

function SipCalculator() {
    const [amt, setAmt] = useState(10000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);
    const [results, setResults] = useState({ fv: 0, totalInv: 0, gain: 0, mult: 0 });

    useEffect(() => {
        const i = rate / 12 / 100;
        const n = years * 12;
        const fv = amt * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        const totalInv = amt * n;

        setResults({
            fv,
            totalInv,
            gain: fv - totalInv,
            mult: fv / totalInv
        });

        if (fv >= 10000000) {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
    }, [amt, rate, years]);

    return (
        <section id="sip-calc" className="sip-section">
            <div className="sip-container">
                <div className="sip-controls">
                    <h2>5. Personal Wealth Planner (SIP)</h2>
                    <p className="subtitle">Visualize potential wealth accumulation based on retail participation CAGR averages.</p>

                    <div className="control-panel">
                        <div className="slider-group">
                            <label>Monthly SIP Amount (₹)</label>
                            <input type="range" min="500" max="100000" step="500" value={amt} onChange={(e) => setAmt(Number(e.target.value))} />
                            <div className="slider-labels">
                                <span>₹500</span> <strong>₹{amt.toLocaleString('en-IN')}</strong> <span>₹1L</span>
                            </div>
                        </div>
                        <div className="slider-group">
                            <label>Expected Annual Return (%)</label>
                            <input type="range" min="8" max="25" step="0.5" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
                            <div className="slider-labels">
                                <span>8%</span> <strong>{rate}%</strong> <span>25%</span>
                            </div>
                        </div>
                        <div className="slider-group">
                            <label>Investment Period (Years)</label>
                            <input type="range" min="1" max="30" step="1" value={years} onChange={(e) => setYears(Number(e.target.value))} />
                            <div className="slider-labels">
                                <span>1 Yr</span> <strong>{years} Yrs</strong> <span>30 Yrs</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sip-output-wrapper">
                    <div className="sip-result-card">
                        <p className="card-label">Projected Future Value</p>
                        <div className="main-result">
                            {results.fv >= 10000000 ? `₹${(results.fv / 10000000).toFixed(2)} Cr` : `₹${(results.fv / 100000).toFixed(1)} Lakhs`}
                        </div>
                        <p className="invested-text">Total Invested: <strong>₹{(results.totalInv / 100000).toFixed(1)} Lakhs</strong></p>

                        <div className="result-grid">
                            <div>
                                <p className="grid-label">Estimated Gain</p>
                                <p className="grid-value text-green">₹{(results.gain / 100000).toFixed(1)} L</p>
                            </div>
                            <div>
                                <p className="grid-label">Wealth Multiplier</p>
                                <p className="grid-value text-teal">{results.mult.toFixed(1)}x</p>
                            </div>
                        </div>
                        {results.fv >= 10000000 && (
                            <div className="milestone-badge animation-bounce">🏆 1 CRORE CLUB ACHIEVED!</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SipCalculator;
