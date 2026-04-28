import { useState, useRef, useEffect } from 'react';
import {
  Search, ChevronDown, Clock, Play, X,
  Database, Filter, Zap, BarChart2, TrendingUp
} from 'lucide-react';

const PLACEHOLDER = `Examples:
• Why did hate speech spike last weekend?
• Analyze misinformation trends around elections (last 30 days)
• Identify emerging scam or fraud patterns
• Predict risk growth for political content next week`;

const dataSources = [
  { id: 'platform', label: 'Platform Content', defaultChecked: true },
  { id: 'behavior', label: 'User Behavior Logs', defaultChecked: false },
  { id: 'moderation', label: 'Moderation History', defaultChecked: false },
  { id: 'policy', label: 'Policy Enforcement Logs', defaultChecked: false },
  { id: 'external', label: 'External Threat & Trend Feeds', defaultChecked: true },
];

const filterConfig = [
  { label: 'Date Range', options: ['Last 24h', 'Last 7 days', 'Last 30 days', 'Custom'], default: 'Last 7 days' },
  { label: 'Region', options: ['Global', 'North America', 'Europe', 'Asia', 'Africa', 'Latin America'], default: 'Global' },
  { label: 'Language', options: ['All', 'English', 'Spanish', 'French', 'Arabic', 'Mandarin'], default: 'All' },
  { label: 'Content Type', options: ['All', 'Text', 'Image', 'Video', 'Audio'], default: 'All' },
  { label: 'Risk Category', options: ['All', 'Hate Speech', 'Misinformation', 'Scams', 'Political', 'Violence'], default: 'All' },
];

const researchModes = [
  { id: 'quick', label: 'Quick Insight', desc: 'Fast summary, minimal depth', icon: <Zap size={14}/> },
  { id: 'deep', label: 'Deep Research', desc: 'Full model execution + correlations', icon: <Search size={14}/> },
  { id: 'predictive', label: 'Predictive Analysis', desc: 'Forecast-focused results', icon: <TrendingUp size={14}/> },
];

export default function ResearchConsole({ onRunResearch, isRunning }) {
  const [open, setOpen] = useState(true);
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('quick');
  const [checks, setChecks] = useState({ platform: true, behavior: false, moderation: false, policy: false, external: true });
  const [filters, setFilters] = useState({ 'Date Range': 'Last 7 days', Region: 'Global', Language: 'All', 'Content Type': 'All', 'Risk Category': 'All' });
  const bodyRef = useRef(null);

  const toggleCheck = (id) => setChecks(prev => ({ ...prev, [id]: !prev[id] }));
  const MAX = 2000;

  return (
    <div className="section-wrapper">
      {/* Header */}
      <div className="section-header section-header-teal" onClick={() => setOpen(o => !o)}>
        <div className="section-header-left">
          <div className="section-icon-box">
            <Search size={20} color="white" />
          </div>
          <div>
            <div className="section-title">AI Research &amp; Investigation Console</div>
            <div className="section-subtitle">Ask questions, upload data, and run AI-powered research across platform intelligence</div>
          </div>
        </div>
        <button className={`chevron-btn ${open ? 'open' : ''}`} onClick={e => { e.stopPropagation(); setOpen(o=>!o); }}>
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Body */}
      <div className="section-body" style={{ maxHeight: open ? '2000px' : '0', opacity: open ? 1 : 0 }}>
        <div className="console-inner">
          {/* Textarea */}
          <div style={{ position: 'relative' }}>
            <textarea
              className="query-textarea"
              placeholder={PLACEHOLDER}
              value={query}
              onChange={e => setQuery(e.target.value.slice(0, MAX))}
              rows={6}
            />
            <div className="textarea-footer">
              <span />
              <span className="char-counter">{query.length.toLocaleString()} / {MAX.toLocaleString()}</span>
            </div>
          </div>

          {/* Action row */}
          <div className="action-row">
            <button className="btn btn-ghost" style={{ fontSize: 13 }}>
              <Clock size={14} /> Research History
            </button>
            <div className="action-row-right">
              <button className="btn btn-ghost" onClick={() => setQuery('')}>
                <X size={13} /> Clear
              </button>
              <button
                className="btn btn-teal"
                onClick={() => onRunResearch({ query, mode, checks, filters })}
                disabled={isRunning}
              >
                {isRunning
                  ? <><span className="animate-spin" style={{display:'inline-block'}}>⟳</span> Running...</>
                  : <><Play size={13} /> Run Research</>}
              </button>
            </div>
          </div>

          {/* Two-column grid */}
          <div className="console-grid">
            {/* LEFT: Data Sources */}
            <div className="console-panel">
              <div className="panel-title"><Database size={15} /> Data Sources for Research</div>
              <div className="checkbox-list">
                {dataSources.map(src => (
                  <label className="checkbox-item" key={src.id}>
                    <input
                      type="checkbox"
                      checked={checks[src.id]}
                      onChange={() => toggleCheck(src.id)}
                    />
                    {src.label}
                  </label>
                ))}
              </div>

              <div className="ext-input-section">
                <div className="ext-title">External Data Input</div>
                <div className="ext-buttons">
                  <button className="btn btn-outline" style={{ fontSize: 12, padding: '6px 12px' }}>
                    ⬆ Upload File
                  </button>
                  <button className="btn btn-outline" style={{ fontSize: 12, padding: '6px 12px' }}>
                    🔗 Add URL
                  </button>
                </div>
                <div className="ext-hint">Supported: CSV, JSON, PDF, TXT, Logs, External URLs</div>
              </div>
            </div>

            {/* RIGHT: Filters */}
            <div className="console-panel">
              <div className="panel-title"><Filter size={15} /> Research Filters</div>
              <div className="filter-row">
                {filterConfig.map(f => (
                  <div key={f.label} style={{ marginBottom: 10 }}>
                    <div className="filter-label">{f.label}</div>
                    <select
                      className="filter-select"
                      value={filters[f.label]}
                      onChange={e => setFilters(prev => ({ ...prev, [f.label]: e.target.value }))}
                    >
                      {f.options.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Research Mode */}
          <div className="research-mode-section">
            <div className="research-mode-title">
              <BarChart2 size={15} color="var(--teal-primary)" />
              Research Mode
            </div>
            <div className="mode-cards">
              {researchModes.map(m => (
                <label
                  key={m.id}
                  className={`mode-card ${mode === m.id ? 'active' : ''}`}
                  onClick={() => setMode(m.id)}
                >
                  <input type="radio" name="mode" value={m.id} checked={mode === m.id} onChange={() => setMode(m.id)} />
                  <div>
                    <div className="mode-card-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {m.icon} {m.label}
                    </div>
                    <div className="mode-card-desc">{m.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
