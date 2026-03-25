import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import SipCalculator from './components/SipCalculator';
import Ticker from './components/Ticker';
import Methodology from './components/Methodology';
import DataAnnexure from './components/DataAnnexure';
import './index.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const API_BASE_URL = 'https://snacks-backend-ap8u.onrender.com/api';

function App() {
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [theme, setTheme] = useState('light');

  // Forecasting parameters
  const [mu, setMu] = useState(0.15);
  const [sigma, setSigma] = useState(0.05);
  const [isUpdatingForecast, setIsUpdatingForecast] = useState(false);

  // Apply theme to body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Initial Data Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [historyRes, forecastRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/historical/all`),
          axios.get(`${API_BASE_URL}/modeling/forecast/investors?years=10`)
        ]);
        setData(historyRes.data);
        setForecast(forecastRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Update forecast when parameters change
  useEffect(() => {
    if (!data) return; // Don't run on initial load before base data exists

    const updateForecast = async () => {
      setIsUpdatingForecast(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/modeling/forecast/investors?years=10&mu=${mu}&sigma=${sigma}`);
        setForecast(res.data);
      } catch (error) {
        console.error("Error updating forecast:", error);
      } finally {
        setIsUpdatingForecast(false);
      }
    };

    // Add a slight debounce
    const timeoutId = setTimeout(() => updateForecast(), 300);
    return () => clearTimeout(timeoutId);
  }, [mu, sigma]);

  const toggleNarration = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const text = "This dashboard presents the retail investment analysis. From the J-Curve growth in Indian Demat accounts to the deep probability modeling of our future 450 million investor milestone, we track how structural shifts are defining the Indian economy.";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 0.95;
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  if (loading || !data || !forecast) {
    return <div className="loading-screen"><div className="spinner"></div></div>;
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } }
  };

  const dematData = {
    labels: data.years,
    datasets: [
      { label: 'India (Mn)', data: data.investors.india, backgroundColor: '#3b82f6' },
      { label: 'USA (Mn)', data: data.investors.usa, backgroundColor: '#94a3b8' }
    ]
  };

  const mfData = {
    labels: data.years,
    datasets: [
      { label: 'India ($Bn)', data: data.aum.india, borderColor: '#14b8a6', tension: 0.3, yAxisID: 'y' },
      { label: 'USA ($Tn)', data: data.aum.usa, borderColor: '#f97316', tension: 0.3, yAxisID: 'y1' }
    ]
  };

  const gdpData = {
    labels: data.years,
    datasets: [
      { label: 'India GDP%', data: data.gdp.india, borderColor: '#8b5cf6', fill: false },
      { label: 'USA GDP%', data: data.gdp.usa, borderColor: '#ef4444', fill: false }
    ]
  };

  const allYears = [...data.years, ...forecast.years];
  const pastDataPadded = [...data.investors.india, ...Array(10).fill(null)];
  const futureMeanPadded = Array(11).fill(null);
  futureMeanPadded[10] = data.investors.india[data.investors.india.length - 1]; // Connect lines
  forecast.forecast_india_mn.forEach(val => futureMeanPadded.push(val));

  const futureData = {
    labels: allYears,
    datasets: [
      { label: 'Historical', data: pastDataPadded, borderColor: '#1e293b', borderWidth: 3 },
      { label: 'Forecast (GBM Model)', data: futureMeanPadded, borderColor: '#6366f1', borderDash: [5, 5] }
    ]
  };

  return (
    <div className="app-container">
      <Ticker />

      <nav className="navbar">
        <div className="nav-content">
          <span className="logo">Capstone Project 2025</span>
          <div className="nav-links">
            <a href="#demat">Trends</a>
            <a href="#economic-growth">GDP</a>
            <a href="#future-forecast">Trajectory</a>
            <a href="#sip-calc" className="highlight-link">SIP Calculator</a>
            <a href="#methodology">Methodology</a>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="btn-theme-toggle"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', marginLeft: '1rem' }}
              title="Toggle Dark Mode"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <header className="hero-section">
          <div className="narrate-wrapper">
            <button onClick={toggleNarration} className="btn-narrate">
              <span className="icon">🎧</span>
              <span>{isSpeaking ? 'Stop Audio' : 'Explain Project'}</span>
            </button>
          </div>
          <span className="badge">React & FastAPI Pipeline</span>
          <h1>Trend Analysis of Retail Investment & Economic Impact</h1>
          <p className="subtitle">A Comparative Study of India and the USA (2015-2025) backed by Python Modeling.</p>
        </header>

        <section id="demat" className="content-grid two-cols">
          <div className="text-content">
            <h2 className="border-left-blue">1. Demat Account Growth: The "J-Curve" vs The Giant</h2>
            <div className="prose">
              <p><strong>Analysis:</strong> The graph shows the contrast. The <strong>USA (Gray Bars)</strong> has a massive, mature base. <strong>India (Blue Bars)</strong> shows a classic "J-Curve" explosion post-2020.</p>
              <p><strong>Why this happened in India:</strong> Convergence of cheap data, digital KYC, and discount brokers democratized access during the pandemic.</p>

              <div className="stat-box blue-box">
                <span className="stat-label blue-text">KEY STATISTIC (INDIA)</span>
                <div className="stat-value">~6x Growth</div>
                <div className="stat-desc">From 24 Mn (2015) to 160 Mn (2025).</div>
              </div>
            </div>
          </div>
          <div className="chart-container block-shadow">
            <div className="chart-wrapper"><Bar data={dematData} options={chartOptions} /></div>
          </div>
        </section>

        <section id="mutual-funds" className="content-grid two-cols reverse">
          <div className="chart-container block-shadow">
            <div className="chart-wrapper">
              <Line data={mfData} options={{ ...chartOptions, scales: { y: { position: 'left' }, y1: { position: 'right', grid: { display: false } } } }} />
            </div>
          </div>
          <div className="text-content">
            <h2 className="border-left-teal">2. Financialization of Savings (MFs)</h2>
            <div className="prose">
              <p><strong>Analysis:</strong> While the <strong>USA (Orange Line)</strong> operates on a massive scale (Trillions), <strong>India's (Teal Line)</strong> growth rate is significantly faster.</p>
              <p><strong>The SIP Culture in India:</strong> Systematic Investment Plans (SIPs) have become the bedrock of domestic inflows.</p>

              <div className="stat-box teal-box">
                <span className="stat-label teal-text">INDIA SIP GROWTH</span>
                <div className="stat-value">Consistent Inflows</div>
                <div className="stat-desc">Acting as a buffer against market volatility.</div>
              </div>
            </div>
          </div>
        </section>

        <section id="economic-growth" className="full-width-section">
          <div className="section-header">
            <h2>3. Economic Growth Comparison (2015-2025)</h2>
            <p>Comparing the GDP Growth Rate (%) of India vs USA.</p>
          </div>
          <div className="chart-container block-shadow border-top-purple">
            <div className="chart-wrapper large"><Line data={gdpData} options={chartOptions} /></div>
          </div>
        </section>

        <section id="future-forecast" className="full-width-section">
          <div className="section-header">
            <h2>4. Economic Trajectory (2015-2035)</h2>
            <p>Using Geometric Brownian Motion to forecast India's retail growth.</p>
          </div>

          <div className="chart-container block-shadow border-top-indigo">
            <div className={`chart-wrapper large ${isUpdatingForecast ? 'opacity-50 transition-opacity' : ''}`}>
              <Line data={futureData} options={chartOptions} />
            </div>

            {/* Interactive Model Controls */}
            <div className="mt-8 pt-6 border-t border-slate-200" style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="slider-group">
                  <label>Market Growth Rate (Drift μ): {(mu * 100).toFixed(1)}%</label>
                  <input
                    type="range" min="0.05" max="0.30" step="0.01"
                    value={mu} onChange={(e) => setMu(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent-purple)' }}
                  />
                  <div className="slider-labels">
                    <span>5%</span><span>30%</span>
                  </div>
                </div>
                <div className="slider-group">
                  <label>Market Volatility (σ): {(sigma * 100).toFixed(1)}%</label>
                  <input
                    type="range" min="0.01" max="0.20" step="0.01"
                    value={sigma} onChange={(e) => setSigma(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--danger-color)' }}
                  />
                  <div className="slider-labels">
                    <span>1%</span><span>20%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SipCalculator />
        <Methodology />
        <DataAnnexure data={data} />

      </main>

      <footer className="site-footer">
        <p>&copy; 2026 Capstone Project | Full-Stack Analysis Pipeline</p>
      </footer>
    </div>
  );
}

export default App;
