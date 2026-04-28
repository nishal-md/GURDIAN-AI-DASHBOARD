import React from 'react';
import { X, Shield, RefreshCw, Moon, Globe, Lock } from 'lucide-react';

export default function SettingsModal({ onClose, onAction }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        <div className="modal-header">
          <div className="modal-header-icon" style={{ background: 'var(--bg-section)' }}>
            <Shield size={20} color="var(--accent-blue)" />
          </div>
          <div className="modal-header-text">
            <div className="modal-header-title">System Settings</div>
            <div className="modal-header-sub">Configure your Guardian AI environment</div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <RefreshCw size={18} color="var(--text-secondary)" />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>Real-time Auto-refresh</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Sync dashboard every 10 seconds</div>
                </div>
              </div>
              <input type="checkbox" defaultChecked style={{ width: '40px', height: '20px' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Moon size={18} color="var(--text-secondary)" />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>Dark Mode</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Switch to high-contrast dark theme</div>
                </div>
              </div>
              <input type="checkbox" style={{ width: '40px', height: '20px' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Globe size={18} color="var(--text-secondary)" />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>Region</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Select data processing node</div>
                </div>
              </div>
              <select style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '12px' }}>
                <option>Global (Edge)</option>
                <option>US-East-1</option>
                <option>EU-West-1</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px', padding: '12px', background: 'var(--bg-section)', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
              <Lock size={16} color="var(--accent-blue)" />
              <div style={{ fontSize: '12px', color: 'var(--text-body)' }}>
                Your session is secured with <strong>AES-256</strong> hardware encryption.
              </div>
            </div>

          </div>
        </div>

        <div className="modal-footer" style={{ padding: '16px 24px', borderTop: '1px solid var(--border-card)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-navy" onClick={() => { onAction?.('Settings saved successfully.'); onClose(); }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
