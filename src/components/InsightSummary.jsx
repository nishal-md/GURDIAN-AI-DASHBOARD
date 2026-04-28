import { useState } from 'react';
import { Brain, FileText, CheckCircle, ArrowRight, X, Info, Download } from 'lucide-react';

function ReportModal({ onClose }) {
  const now = new Date();
  const formatted = now.toLocaleString('en-US', {
    month: 'numeric', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true
  });
  const dateOnly = now.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box animate-fade">
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: 8, display:'flex',alignItems:'center',justifyContent:'center' }}>
            <FileText size={20} color="white" />
          </div>
          <div className="modal-header-text">
            <div className="modal-header-title">Intelligence Report</div>
            <div className="modal-header-sub">Generated {formatted}</div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="modal-title-row">
            <div className="modal-main-title">Guardian AI Intelligence Report</div>
            <div className="conf-pill">
              <div className="conf-pill-dot" />
              Confidence: 94%
            </div>
          </div>

          <div className="modal-meta-row">
            <div className="modal-meta-item"><strong>Report Type:</strong> AI Insight Summary</div>
            <div className="modal-meta-item"><strong>Generated:</strong> {dateOnly}</div>
            <div className="modal-meta-item"><strong>Last Updated:</strong> 2 minutes ago</div>
          </div>

          {/* Executive Summary */}
          <div className="modal-section-title">
            <Brain size={15} color="var(--teal-primary)" /> Executive Summary
          </div>
          <div className="modal-exec-box">
            Hate speech increased by 18% in the last 7 days. Two emerging topic clusters are driving this rise.
            Engagement spikes correlate strongly with flagged content. Recommended action: tighten moderation
            thresholds. The analysis draws from platform content logs, user behavior signals, and moderation history
            with a confidence score of 94%, indicating high statistical reliability.
          </div>

          {/* Key Findings */}
          <div className="modal-section-title">
            <ArrowRight size={15} color="var(--teal-primary)" /> Key Findings
          </div>
          <div className="findings-grid">
            {[
              {
                title: 'Hate speech increased by 18% in the last 7 days',
                sub: 'Significant spike detected across multiple regions'
              },
              {
                title: 'Two emerging topic clusters driving the rise',
                sub: 'Coordinated activity patterns identified'
              },
              {
                title: 'Strong correlation between engagement spikes and flagged content',
                sub: 'Statistical significance: p < 0.01'
              },
            ].map((f, i) => (
              <div key={i} className="finding-card">
                <ArrowRight size={16} className="finding-icon" color="var(--teal-primary)" />
                <div>
                  <div className="finding-title">{f.title}</div>
                  <div className="finding-sub">{f.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommended Actions */}
          <div className="modal-section-title">
            <CheckCircle size={15} color="#d97706" /> Recommended Actions
          </div>
          <div className="actions-box">
            {[
              'Tighten moderation thresholds for identified topic clusters',
              'Increase monitoring frequency during peak engagement hours',
              'Deploy additional resources to high-risk regions',
              'Review and update content policy guidelines',
            ].map((a, i) => (
              <div key={i} className="action-item">
                <CheckCircle size={14} className="action-check" color="#d97706" style={{ marginTop: 1 }} />
                {a}
              </div>
            ))}
          </div>

          {/* Footer Meta */}
          <div className="modal-footer-meta">
            <span><strong>Data Sources:</strong> Platform Content, User Behavior Logs, Moderation History</span>
            <span><strong>Models Used:</strong> T5/Pegasus (Summarization), LSTM (Trends), LDA/BERTopic (Topics), ML Classification (Health Scoring)</span>
            <span><strong>Confidence Level:</strong> 94% (High)</span>
            <span><strong>Report ID:</strong> GRD-1772880009993</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <div className="modal-footer-note">
            <Info size={13} />
            This report is confidential and intended for authorized personnel only
          </div>
          <div className="modal-footer-actions">
            <button className="btn btn-outline" onClick={onClose}>Close</button>
            <button className="btn btn-teal">
              <Download size={13} /> Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InsightSummary() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="insight-card">
        {/* Header */}
        <div className="insight-header">
          <div className="insight-header-left">
            <div className="insight-icon">
              <Brain size={20} />
            </div>
            <div>
              <div className="insight-title">AI Insight Summary</div>
              <div className="insight-sub">Intelligence Layer</div>
            </div>
          </div>
          <div className="live-badge">
            <div className="live-dot" />
            Live
          </div>
        </div>

        {/* Text box */}
        <div className="insight-text-box">
          Hate speech increased by <strong>18%</strong> in the last 7 days. Two emerging topic clusters are
          driving this rise. Engagement spikes correlate strongly with flagged content.
          Recommended action: <em>tighten moderation thresholds.</em>
        </div>

        {/* Footer */}
        <div className="insight-footer">
          <div className="insight-footer-left">
            <div className="confidence-indicator">
              <div className="conf-dot" />
              Confidence: 94%
            </div>
            <span>🕐 Updated 2 minutes ago</span>
          </div>
          <button className="btn btn-teal" onClick={() => setShowModal(true)}>
            <FileText size={13} /> Generate Report
          </button>
        </div>
      </div>

      {showModal && <ReportModal onClose={() => setShowModal(false)} />}
    </>
  );
}
