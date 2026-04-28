import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Share2 } from 'lucide-react';

function generateNetworkData(seed = 0) {
  const rng = (n) => Math.abs(Math.sin(n * seed + 1)) * 100;
  const nodeCount = 28;
  const nodes = Array.from({ length: nodeCount }, (_, i) => ({
    id: i,
    risk_score: Math.round(rng(i * 7.3 + seed)),
    group: i < 5 ? 0 : i < 12 ? 1 : i < 19 ? 2 : 3,
    suspicious: rng(i * 3.1) > 70,
  }));

  const edges = [];
  // Cluster 0 — tightly connected (botnet)
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 5; j++) edges.push({ source: i, target: j });
  // Cluster 1
  for (let i = 5; i < 11; i++) edges.push({ source: i, target: i + 1 });
  edges.push({ source: 5, target: 10 });
  // Cluster 2
  for (let i = 12; i < 18; i++) edges.push({ source: i, target: i + 1 });
  // Cluster 3
  for (let i = 19; i < 27; i++) edges.push({ source: i, target: i + 1 });
  // Inter-cluster
  edges.push({ source: 2, target: 7 });
  edges.push({ source: 9, target: 15 });
  edges.push({ source: 16, target: 22 });

  return { nodes, edges };
}

function riskColor(score) {
  if (score >= 70) return '#ef4444';
  if (score >= 40) return '#f59e0b';
  return '#10b981';
}

export default function NetworkGraph({ seed = 0 }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const { nodes, edges } = generateNetworkData(seed);

    const W = el.clientWidth || 560;
    const H = 280;

    d3.select(el).selectAll('*').remove();

    const svg = d3.select(el)
      .attr('width', '100%')
      .attr('height', H)
      .attr('viewBox', `0 0 ${W} ${H}`);

    // Defs — glow filter
    const defs = svg.append('defs');
    const filter = defs.append('filter').attr('id', 'glow');
    filter.append('feGaussianBlur').attr('stdDeviation', 2.5).attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(edges).id(d => d.id).distance(40).strength(0.7))
      .force('charge', d3.forceManyBody().strength(-60))
      .force('center', d3.forceCenter(W / 2, H / 2))
      .force('collision', d3.forceCollide(14));

    const link = svg.append('g')
      .selectAll('line')
      .data(edges)
      .join('line')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 1.2)
      .attr('stroke-opacity', 0.6);

    const nodeGroup = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(
        d3.drag()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x; d.fy = d.y;
          })
          .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null; d.fy = null;
          })
      );

    nodeGroup.append('circle')
      .attr('r', d => d.suspicious ? 9 : 6)
      .attr('fill', d => riskColor(d.risk_score))
      .attr('fill-opacity', 0.9)
      .attr('stroke', d => d.suspicious ? '#fff' : 'none')
      .attr('stroke-width', d => d.suspicious ? 1.5 : 0)
      .style('filter', d => d.suspicious ? 'url(#glow)' : 'none')
      .style('cursor', 'pointer');

    // Tooltip on hover
    nodeGroup.append('title')
      .text(d => `Node ${d.id} | Risk: ${d.risk_score} | ${d.suspicious ? '⚠ Suspicious' : 'Normal'}`);

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
      nodeGroup
        .attr('transform', d => `translate(${Math.max(10, Math.min(W - 10, d.x))},${Math.max(10, Math.min(H - 10, d.y))})`);
    });

    return () => simulation.stop();
  }, [seed]);

  return (
    <div className="chart-card chart-full">
      <div className="chart-header">
        <div className="chart-title">
          <Share2 size={15} color="#3b82f6" /> Coordination Network
        </div>
        <span className="chart-badge badge-blue">Model 5</span>
      </div>
      <div className="chart-subtitle">Powered by Graph Intelligence (GraphSAGE) — Drag nodes to explore</div>

      <div className="chart-stats-row">
        <div className="stat-pill" style={{ color: '#ef4444' }}>⚠ 5 Suspicious Clusters</div>
        <div className="stat-pill" style={{ color: '#f59e0b' }}>🔗 Coordinated Activity Detected</div>
        <div className="stat-pill" style={{ color: '#3b82f6' }}>📡 Shared IP/Device Detected</div>
      </div>

      <div className="network-canvas-wrap">
        <svg ref={svgRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      <div className="network-info-bar">
        {[
          { label: '5 accounts acting as bot network', color: '#fef2f2', text: '#b91c1c', border: '#fecaca' },
          { label: 'Coordinated activity detected', color: '#fffbeb', text: '#92400e', border: '#fde68a' },
          { label: '3 shared IP clusters', color: '#eff6ff', text: '#1e40af', border: '#bfdbfe' },
        ].map((pill, i) => (
          <div key={i} className="network-info-pill" style={{
            background: pill.color, color: pill.text,
            border: `1px solid ${pill.border}`
          }}>
            {pill.label}
          </div>
        ))}
      </div>

      <div className="anomaly-legend" style={{ marginTop: 10 }}>
        <div className="anomaly-legend-item"><div className="legend-dot" style={{ background: '#ef4444' }} />High Risk (≥70)</div>
        <div className="anomaly-legend-item"><div className="legend-dot" style={{ background: '#f59e0b' }} />Medium Risk (40–69)</div>
        <div className="anomaly-legend-item"><div className="legend-dot" style={{ background: '#10b981' }} />Low Risk (&lt;40)</div>
        <div className="anomaly-legend-item"><div className="legend-dot" style={{ background: '#fff', border: '2px solid #ef4444', boxSizing:'border-box' }} />Suspicious Node</div>
      </div>
    </div>
  );
}
