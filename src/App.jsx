import { useState, useCallback, useRef, useEffect } from 'react';
import './index.css';
import './App.css';

import Navbar from './components/Navbar';
import ResearchConsole from './components/ResearchConsole';
import InsightSummary from './components/InsightSummary';
import {
  TopicIntelligenceChart,
  AnomalyDetectionChart,
  ForecastChart,
  RiskDistributionChart,
} from './components/Charts';
import NetworkGraph from './components/NetworkGraph';
import SystemHealth from './components/SystemHealth';
import PipelineRunner from './components/PipelineRunner';

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [seed, setSeed] = useState(0);
  const [pipelineVisible, setPipelineVisible] = useState(false);
  const chartsRef = useRef(null);

  const handleRunResearch = useCallback(() => {
    setPipelineVisible(true);
    setIsRunning(true);
  }, []);

  // Auto-update system (Model-driven real-time updates every 10s)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRunning) {
        setSeed(s => s + 1);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const handlePipelineComplete = useCallback(() => {
    setSeed(s => s + 1);
    setIsRunning(false);
    // Scroll to charts
    if (chartsRef.current) {
      chartsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        {/* Section 1: Research Console */}
        <ResearchConsole onRunResearch={handleRunResearch} isRunning={isRunning} />

        {/* Pipeline execution display */}
        {pipelineVisible && (
          <PipelineRunner
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            onComplete={handlePipelineComplete}
          />
        )}

        {/* Section 2: AI Insight Summary */}
        <InsightSummary />

        {/* Charts Section */}
        <div ref={chartsRef}>
          {/* Row 1: Topic Intelligence + Anomaly Detection */}
          <div className="charts-grid" style={{ marginBottom: 16 }}>
            <TopicIntelligenceChart seed={seed} />
            <AnomalyDetectionChart seed={seed} />
          </div>

          {/* Row 2: Forecast + Risk Distribution */}
          <div className="charts-grid" style={{ marginBottom: 16 }}>
            <ForecastChart seed={seed} />
            <RiskDistributionChart seed={seed} />
          </div>

          {/* Row 3: Coordination Network (full width) */}
          <div className="charts-grid" style={{ marginBottom: 20 }}>
            <NetworkGraph seed={seed} />
          </div>
        </div>

        {/* System Health */}
        <SystemHealth isRunning={isRunning} />

        {/* Footer */}
        <footer style={{
          textAlign: 'center', padding: '20px 0 8px',
          borderTop: '1px solid var(--gray-200)', marginTop: 8,
        }}>
          <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>
            Guardian AI – Research &amp; Analytics Hub &nbsp;|&nbsp; Real-Time AI Intelligence System &nbsp;|&nbsp;
            <span style={{ color: 'var(--teal-primary)', fontWeight: 500 }}> Live</span>
          </p>
          <p style={{ fontSize: 11, color: 'var(--gray-300)', marginTop: 4 }}>
            Powered by Model 1–6 Pipeline · CLIP · BERT · HDBSCAN · GraphSAGE · TFT · RAG-X
          </p>
        </footer>
      </main>
    </div>
  );
}
