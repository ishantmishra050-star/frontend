import React from 'react';

function Methodology() {
    return (
        <section id="methodology" className="methodology-section">
            <div className="section-header border-bottom">
                <h2>6. Technical Methodology & Tools</h2>
                <p>End-to-end data engineering and probabilistic modeling implementation.</p>
            </div>

            <div className="methodology-steps">
                <div className="step-card">
                    <div className="step-info">
                        <div className="step-header">
                            <span className="step-number bg-blue">1</span>
                            <h3>Data Gathering & API Validation</h3>
                        </div>
                        <ul>
                            <li><strong>Secondary Research:</strong> Automated queries via Web Search APIs were used to collect markers for 2024-25.</li>
                            <li>Verified official SEBI and Fed Reserve reports by cross-matching with real-time financial news data.</li>
                        </ul>
                    </div>
                    <div className="code-window">
                        <div className="code-header">
                            <div className="dot dot-red"></div>
                            <div className="dot dot-yellow"></div>
                            <div className="dot dot-green"></div>
                            <span className="filename">web_search_api.py</span>
                        </div>
                        <pre className="code-snippet">
                            <span className="kwd">import</span> requests{'\n'}
                            <span className="cmt"># Real-time data fetch karne ke liye API ka upyog</span>{'\n'}
                            search_url = <span className="str">"https://api.searchprovider.com/v1"</span>{'\n'}
                            query = {'{"q"'}: <span className="str">"Indian Demat Account Stats Jan 2025"</span>{'}'}{'\n'}
                            response = requests.get(search_url, params=query)
                        </pre>
                    </div>
                </div>

                <div className="step-card">
                    <div className="step-info">
                        <div className="step-header">
                            <span className="step-number bg-pink">2</span>
                            <h3>Data Cleaning & Preprocessing</h3>
                        </div>
                        <ul>
                            <li>Noise reduction and duplicate elimination using pandas.</li>
                            <li>Normalizing financial units (Mn/Bn) across multi-country datasets.</li>
                        </ul>
                    </div>
                    <div className="code-window">
                        <div className="code-header">
                            <div className="dot dot-red"></div>
                            <div className="dot dot-yellow"></div>
                            <div className="dot dot-green"></div>
                            <span className="filename">cleaning.py</span>
                        </div>
                        <pre className="code-snippet">
                            <span className="cmt"># Null handling aur data cleaning logic</span>{'\n'}
                            df.dropna(subset=[<span className="str">'Investors'</span>], inplace=<span className="kwd">True</span>){'\n'}
                            df.drop_duplicates(inplace=<span className="kwd">True</span>){'\n'}
                            <span className="cmt"># Strip extra spaces and normalize names</span>{'\n'}
                            df.columns = [c.strip().lower() <span className="kwd">for</span> c <span className="kwd">in</span> df.columns]
                        </pre>
                    </div>
                </div>

                <div className="step-card">
                    <div className="step-info">
                        <div className="step-header">
                            <span className="step-number bg-green">3</span>
                            <h3>Deep Probability Modeling</h3>
                        </div>
                        <ul>
                            <li>Implemented Stochastic growth logic to simulate market volatility via the new FastAPI backend.</li>
                            <li>Used <strong>Geometric Brownian Motion (GBM)</strong> for 2025-2035 projections.</li>
                        </ul>
                    </div>
                    <div className="code-window">
                        <div className="code-header">
                            <div className="dot dot-red"></div>
                            <div className="dot dot-yellow"></div>
                            <div className="dot dot-green"></div>
                            <span className="filename">modeling.py (FastAPI endpoint)</span>
                        </div>
                        <pre className="code-snippet">
                            <span className="cmt"># Deep Probability Stochastic Simulation</span>{'\n'}
                            <span className="kwd">import</span> numpy <span className="kwd">as</span> np{'\n'}
                            <span className="kwd">def</span> <span className="func">geometric_brownian_motion</span>(val, mu, sigma):{'\n'}
                            {'   '}drift = (mu - <span className="num">0.5</span> * sigma**<span className="num">2</span>){'\n'}
                            {'   '}diffusion = sigma * np.random.normal(<span className="num">0</span>, <span className="num">1</span>){'\n'}
                            {'   '}<span className="kwd">return</span> val * np.exp(drift + diffusion)
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Methodology;
