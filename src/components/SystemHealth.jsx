import { Cpu, CheckCircle, AlertTriangle, Clock, Zap } from 'lucide-react';

const models = [
  {
    id: 'Model 1',
    name: 'Unified Representation',
    desc: 'CLIP + BERT Embeddings',
    accuracy: 96,
    latency: '42ms',
    drift: 'Stable',
    stability: 'High',
    color: '#10b981',
    status: 'online',
  },
  {
    id: 'Model 2',
    name: 'Topic Intelligence',
    desc: 'HDBSCAN Clustering',
    accuracy: 91,
    latency: '78ms',
    drift: 'Low',
    stability: 'High',
    color: '#3b82f6',
    status: 'online',
  },
  {
    id: 'Model 3',
    name: 'Anomaly Detection',
    desc: 'Isolation Forest + AE',
    accuracy: 88,
    latency: '55ms',
    drift: 'Monitor',
    stability: 'Medium',
    color: '#ef4444',
    status: 'warning',
  },
  {
    id: 'Model 4',
    name: 'Forecast Engine',
    desc: 'TFT / LSTM',
    accuracy: 85,
    latency: '210ms',
    drift: 'Stable',
    stability: 'High',
    color: '#7c3aed',
    status: 'online',
  },
  {
    id: 'Model 5',
    name: 'Graph Intelligence',
    desc: 'GraphSAGE',
    accuracy: 93,
    latency: '95ms',
    drift: 'Stable',
    stability: 'High',
    color: '#0891b2',
    status: 'online',
  },
  {
    id: 'Model 6',
    name: 'RAG-X Insight Engine',
    desc: 'LLM + Vector DB',
    accuracy: 90,
    latency: '340ms',
    drift: 'Stable',
    stability: 'High',
    color: '#059669',
    status: 'online',
  },
];

function StatusDot({ status }) {
  const colors = { online: '#10b981', warning: '#f59e0b', offline: '#ef4444' };
  return (
    <div
      className="health-status-dot"
      style={{
        background: colors[status] || '#94a3b8',
        boxShadow: `0 0 5px ${colors[status] || '#94a3b8'}`,
        animation: status === 'online' ? 'blink 2.5s infinite' : 'none',
      }}
    />
  );
}

function AccuracyMini({ val, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ flex: 1, height: 4, background: '#f1f5f9', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${val}%`, height: '100%', background: color, borderRadius: 2, transition: 'width 0.8s ease' }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color, minWidth: 30 }}>{val}%</span>
    </div>
  );
}

export default function SystemHealth({ isRunning }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {/* Section title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 9, background: 'linear-gradient(135deg, #0d9488, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Cpu size={18} color="white" />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--gray-900)' }}>System Health &amp; Model Status</div>
            <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>Real-time model performance monitoring</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {isRunning && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 500,
              color: '#d97706', background: '#fffbeb', border: '1px solid #fde68a',
              borderRadius: 20, padding: '4px 12px',
            }}>
              <Zap size={13} className="animate-pulse" />
              Pipeline Active
            </div>
          )}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, fontSize: 12,
            color: '#059669', background: '#d1fae5', borderRadius: 20, padding: '4px 12px', fontWeight: 600,
          }}>
            <CheckCircle size={13} />
            All Systems Operational
          </div>
        </div>
      </div>

      {/* Model cards grid */}
      <div className="health-grid">
        {models.map(m => (
          <div key={m.id} className="health-card" style={{ borderTop: `3px solid ${m.color}` }}>
            <div className="health-card-top">
              <span className="health-model-badge" style={{ color: m.color, background: `${m.color}18` }}>{m.id}</span>
              <StatusDot status={m.status} />
            </div>
            <div className="health-card-title">{m.name}</div>
            <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 10 }}>{m.desc}</div>
            <AccuracyMini val={m.accuracy} color={m.color} />
            <div className="health-metrics" style={{ marginTop: 8 }}>
              <div className="health-metric-row">
                <span className="health-metric-label">Latency</span>
                <span className="health-metric-val" style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Clock size={10} color="#94a3b8" /> {m.latency}
                </span>
              </div>
              <div className="health-metric-row">
                <span className="health-metric-label">Drift</span>
                <span className="health-metric-val" style={{ color: m.drift === 'Monitor' ? '#f59e0b' : '#10b981' }}>
                  {m.drift === 'Monitor' ? <AlertTriangle size={11} /> : <CheckCircle size={11} />} {m.drift}
                </span>
              </div>
              <div className="health-metric-row">
                <span className="health-metric-label">Stability</span>
                <span className="health-metric-val">{m.stability}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
