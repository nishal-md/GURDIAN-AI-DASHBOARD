import { useState, useEffect, useCallback } from 'react';
import { CheckCircle, Circle, Loader } from 'lucide-react';

const PIPELINE_STEPS = [
  { id: 'ingest',   label: 'Phase 1: Data Ingestion & Standardization', sub: 'Kafka Event Bus → S3 Data Lake' },
  { id: 'models',   label: 'Phase 2: Model Processing (Parallel Execution)', sub: 'Running Models 1–5 for real-time intelligence' },
  { id: 'synthesis', label: 'Phase 3: Synthesis & Explainability', sub: 'Model 6 (RAG-X) generating contextual insights' },
  { id: 'render',   label: 'Phase 4: Human Interaction (UI Sync)', sub: 'Synchronizing all charts and intelligence panels' },
];

export default function PipelineRunner({ onComplete, isRunning, setIsRunning }) {
  const [step, setStep] = useState(-1);
  const [done, setDone] = useState([]);
  const [progress, setProgress] = useState(0);

  const runPipeline = useCallback(() => {
    setIsRunning(true);
    setDone([]);
    setStep(0);
    setProgress(0);
  }, [setIsRunning]);

  useEffect(() => {
    if (!isRunning || step < 0) return;
    if (step >= PIPELINE_STEPS.length) {
      setIsRunning(false);
      setStep(-1);
      onComplete();
      return;
    }
    const delay = 400 + Math.random() * 300;
    const timer = setTimeout(() => {
      setDone(prev => [...prev, PIPELINE_STEPS[step].id]);
      setProgress(Math.round(((step + 1) / PIPELINE_STEPS.length) * 100));
      setStep(s => s + 1);
    }, delay);
    return () => clearTimeout(timer);
  }, [step, isRunning, onComplete, setIsRunning]);

  if (!isRunning && done.length === 0) return null;

  return (
    <div className="card" style={{ marginBottom: 20, padding: 18, background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 6 }}>
          {isRunning
            ? <><Loader size={14} className="animate-spin" style={{ display: 'inline-block' }} color="#10b981" /> AI Pipeline Executing...</>
            : <><CheckCircle size={14} color="#10b981" /> Pipeline Complete</>}
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: progress === 100 ? '#059669' : '#d97706' }}>
          {progress}%
        </span>
      </div>
      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {PIPELINE_STEPS.map((s, i) => {
          const isDone = done.includes(s.id);
          const isCurrent = isRunning && step === i;
          return (
            <div key={s.id} className="pipeline-row" style={{
              opacity: isDone || isCurrent ? 1 : 0.35,
              background: isDone ? '#f0fdf4' : isCurrent ? '#fffbeb' : '#f8fafc',
              border: isCurrent ? '1px solid #fde68a' : '1px solid transparent',
              borderRadius: 6,
            }}>
              <div className="pipeline-icon">
                {isDone
                  ? <CheckCircle size={14} color="#10b981" />
                  : isCurrent
                    ? <Loader size={14} color="#d97706" className="animate-spin" style={{ display:'inline-block' }} />
                    : <Circle size={14} color="#cbd5e1" />}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: isDone ? 600 : 400, color: isDone ? '#065f46' : isCurrent ? '#92400e' : '#64748b' }}>
                  {s.label}
                </span>
                <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 6 }}>— {s.sub}</span>
              </div>
              {isDone && <span style={{ fontSize: 10, color: '#10b981', fontWeight: 600 }}>✓</span>}
              {isCurrent && <span style={{ fontSize: 10, color: '#d97706', fontWeight: 600 }}>Running</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
