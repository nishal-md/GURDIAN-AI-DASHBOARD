import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceDot, Legend, Area, AreaChart,
  ComposedChart, Bar, BarChart, Cell, Scatter, ScatterChart
} from 'recharts';
import { TrendingUp, AlertTriangle, Activity, BarChart2 } from 'lucide-react';

/* ─── DATA GENERATORS ─────────────────────────── */
function genTopicData(seed = 0) {
  const now = Date.now();
  return Array.from({ length: 24 }, (_, i) => {
    const t = new Date(now - (23 - i) * 3600000);
    const h = t.getHours();
    return {
      time: t.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      hate_speech: Math.max(20, Math.round(35 + Math.sin((i + seed) * 0.7) * 18 + Math.random() * 15)),
      misinformation: Math.max(15, Math.round(28 + Math.cos((i + seed) * 0.5) * 12 + Math.random() * 12)),
      scams: Math.max(10, Math.round(20 + Math.sin((i + seed) * 0.9) * 10 + Math.random() * 10)),
      normal: Math.max(30, Math.round(60 + Math.cos((i + seed) * 0.4) * 15 + Math.random() * 10)),
    };
  });
}

function genAnomalyData(seed = 0) {
  const now = Date.now();
  const anomalyIdx = [4, 9, 15, 19];
  return Array.from({ length: 24 }, (_, i) => {
    const t = new Date(now - (23 - i) * 3600000);
    const isAnomaly = anomalyIdx.includes(i);
    return {
      time: t.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      activity: Math.round(30 + Math.sin((i + seed) * 0.6) * 20 + Math.random() * 15 + (isAnomaly ? 35 : 0)),
      severity: isAnomaly ? Math.round(65 + Math.random() * 30) : Math.round(10 + Math.random() * 20),
      anomaly: isAnomaly,
      label: isAnomaly ? (['Bot Activity', 'Spam Burst', 'Coordinated Post', 'Mass Flag'][anomalyIdx.indexOf(i) % 4]) : null,
    };
  });
}

function genForecastData(seed = 0) {
  const now = Date.now();
  return Array.from({ length: 30 }, (_, i) => {
    const t = new Date(now - (29 - i) * 86400000);
    const actual = i < 23 ? Math.round(40 + Math.sin((i + seed) * 0.5) * 15 + Math.random() * 10) : null;
    const predicted = i >= 20 ? Math.round(55 + (i - 20) * 2.5 + Math.sin(i * 0.7) * 5) : null;
    return {
      day: t.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      actual,
      predicted,
      upper: predicted ? predicted + 10 : null,
      lower: predicted ? Math.max(0, predicted - 10) : null,
    };
  });
}

function genRiskData(seed = 0) {
  const s = seed * 3;
  return [
    { label: 'Toxicity', score: Math.min(100, 72 + s % 10), trend: '↑', model: 'Model 3', color: '#EF4444' },
    { label: 'Harassment', score: Math.min(100, 65 + s % 8), trend: '↑', model: 'Model 3', color: '#F59E0B' },
    { label: 'Misinformation', score: Math.min(100, 58 + s % 12), trend: '↓', model: 'Model 2', color: '#F59E0B' },
    { label: 'Trust Signals', score: Math.min(100, 81 + s % 5), trend: '↑', model: 'Model 5', color: '#10B981' },
  ];
}

/* ─── CUSTOM TOOLTIP ──────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#1e293b', borderRadius: 8, padding: '10px 14px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)', border: '1px solid #334155'
    }}>
      <p style={{ color: '#94a3b8', fontSize: 11, marginBottom: 6 }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
          <span style={{ color: '#e2e8f0', fontSize: 12 }}>{p.name}: <strong>{p.value}</strong></span>
        </div>
      ))}
    </div>
  );
};

/* ─── TOPIC INTELLIGENCE ──────────────────────── */
export function TopicIntelligenceChart({ seed }) {
  const data = genTopicData(seed);
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title"><TrendingUp size={15} color="var(--teal-primary)" /> Topic Intelligence</div>
        <span className="chart-badge badge-teal">Model 2</span>
      </div>
      <div className="chart-subtitle">Powered by Clustering AI (HDBSCAN + BERT)</div>
      <div className="chart-stats-row">
        <div className="stat-pill" style={{ color: '#ef4444' }}>🔴 Hate +18%</div>
        <div className="stat-pill" style={{ color: '#f59e0b' }}>🟡 Misinfo +9%</div>
        <div className="stat-pill" style={{ color: '#8b5cf6' }}>🟣 Scams +6%</div>
        <div className="stat-pill" style={{ color: '#10b981' }}>✅ Normal 94%</div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#94a3b8' }} interval={5} />
          <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Line type="monotone" dataKey="hate_speech" name="Hate Speech" stroke="#ef4444" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="misinformation" name="Misinformation" stroke="#f59e0b" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="scams" name="Scams" stroke="#8b5cf6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="normal" name="Normal" stroke="#10b981" strokeWidth={2} dot={false} strokeDasharray="4 2" />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
        {['#fraud', '#hate', '#election', '#scam2025'].map(tag => (
          <span key={tag} style={{
            background: '#f1f5f9', color: '#475569', fontSize: 11, fontWeight: 600,
            padding: '2px 8px', borderRadius: 12, border: '1px solid #e2e8f0'
          }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── ANOMALY DETECTION ───────────────────────── */
const AnomalyDot = (props) => {
  const { cx, cy, payload } = props;
  if (!payload.anomaly) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={6} fill="#ef4444" stroke="white" strokeWidth={2} />
      <text x={cx} y={cy - 12} textAnchor="middle" fill="#ef4444" fontSize={9} fontWeight="600">
        {payload.label}
      </text>
    </g>
  );
};

export function AnomalyDetectionChart({ seed }) {
  const data = genAnomalyData(seed);
  const total = data.filter(d => d.anomaly).length;
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title"><AlertTriangle size={15} color="#ef4444" /> Anomaly Detection</div>
        <span className="chart-badge badge-red">Model 3</span>
      </div>
      <div className="chart-subtitle">Powered by Isolation Forest + Autoencoder</div>
      <div className="chart-stats-row">
        <div className="stat-pill" style={{ color: '#ef4444' }}>⚠ {total} Anomalies</div>
        <div className="stat-pill" style={{ color: '#f59e0b' }}>⚡ Severity: HIGH</div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart data={data} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#94a3b8' }} interval={5} />
          <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="activity" name="Activity" fill="rgba(239,68,68,0.08)" stroke="#f87171" strokeWidth={2} />
          <Scatter dataKey="activity" name="Anomaly" shape={<AnomalyDot />} />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="anomaly-legend">
        <div className="anomaly-legend-item"><div className="legend-dot" style={{ background: '#ef4444' }} />Anomaly Marker</div>
        <div className="anomaly-legend-item"><div className="legend-dot" style={{ background: '#f87171' }} />Activity Line</div>
      </div>
    </div>
  );
}

/* ─── FORECAST ENGINE ─────────────────────────── */
export function ForecastChart({ seed }) {
  const data = genForecastData(seed);
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title">
          <Activity size={15} color="var(--purple)" /> Forecast Engine
        </div>
        <span className="chart-badge badge-purple">Model 4</span>
      </div>
      <div className="chart-subtitle">Powered by Temporal AI (TFT/LSTM Model) — 4-Week Prediction</div>
      <div className="chart-stats-row">
        <div className="stat-pill" style={{ color: '#7c3aed' }}>📈 +22% Risk Increase</div>
        <div className="stat-pill" style={{ color: '#059669' }}>🎯 Peak: Day 28</div>
        <div className="stat-pill" style={{ color: '#475569' }}>Confidence: 87%</div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="confBand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#94a3b8' }} interval={4} />
          <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="upper" name="Upper Bound" stroke="none" fill="url(#confBand)" />
          <Area type="monotone" dataKey="lower" name="Lower Bound" stroke="none" fill="white" />
          <Line type="monotone" dataKey="actual" name="Actual" stroke="#7c3aed" strokeWidth={2.5} dot={false} connectNulls={false} />
          <Line type="monotone" dataKey="predicted" name="Predicted" stroke="#a78bfa" strokeWidth={2} strokeDasharray="6 3" dot={false} connectNulls={false} />
        </AreaChart>
      </ResponsiveContainer>
      <div className="anomaly-legend">
        <div className="anomaly-legend-item"><div style={{ width: 20, height: 2, background: '#7c3aed', borderRadius: 2 }} />Actual</div>
        <div className="anomaly-legend-item"><div style={{ width: 20, height: 2, background: '#a78bfa', borderRadius: 2, borderTop: '2px dashed #a78bfa' }} />Predicted</div>
        <div className="anomaly-legend-item"><div style={{ width: 20, height: 8, background: 'rgba(124,58,237,0.15)', borderRadius: 2 }} />Confidence Band</div>
      </div>
    </div>
  );
}

/* ─── RISK DISTRIBUTION ───────────────────────── */
function getRiskColor(score) {
  if (score >= 75) return '#ef4444';
  if (score >= 50) return '#f59e0b';
  return '#10b981';
}

export function RiskDistributionChart({ seed }) {
  const data = genRiskData(seed);
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title"><BarChart2 size={15} color="#3b82f6" /> Risk Distribution</div>
        <span className="chart-badge badge-blue">Multi-Model</span>
      </div>
      <div className="chart-subtitle">Aggregated output — all values normalized 0–100</div>
      <div className="risk-bars" style={{ marginTop: 12 }}>
        {data.map((d, i) => (
          <div key={i} className="risk-bar-row">
            <div className="risk-bar-header">
              <span className="risk-bar-label">{d.label}</span>
              <div className="risk-bar-meta">
                <span className="risk-score" style={{ color: getRiskColor(d.score) }}>{d.score}</span>
                <span className="risk-trend" style={{ color: d.trend === '↑' ? '#ef4444' : '#10b981' }}>{d.trend}</span>
                <span className="risk-model">{d.model}</span>
              </div>
            </div>
            <div className="risk-bar-track">
              <div
                className="risk-bar-fill"
                style={{ width: `${d.score}%`, background: getRiskColor(d.score) }}
              />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 14, marginTop: 14, flexWrap: 'wrap' }}>
        {[['🔴', 'High Risk', '≥75'], ['🟡', 'Medium Risk', '50-74'], ['🟢', 'Safe', '<50']].map(([icon, label, range]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#64748b' }}>
            {icon} {label} ({range})
          </div>
        ))}
      </div>
    </div>
  );
}
