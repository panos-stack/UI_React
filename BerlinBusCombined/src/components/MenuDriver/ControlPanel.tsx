import { useState } from 'react';

function SnowflakeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <line x1="12" y1="2" x2="12" y2="22"></line>
      <path d="m20 16-4-4 4-4"></path>
      <path d="m4 8 4 4-4 4"></path>
      <path d="m16 4-4 4-4-4"></path>
      <path d="m8 20 4-4 4 4"></path>
    </svg>
  );
}

function FlameIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
    </svg>
  );
}

function WindIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
    </svg>
  );
}

function DropletsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
      <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
    </svg>
  );
}

function Switch({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <div className="bus-switch-container">
      <div
        className={`bus-switch ${checked ? 'bus-checked' : ''}`}
        onClick={() => onChange(!checked)}
      >
        <div className="bus-switch-thumb"></div>
      </div>
    </div>
  );
}

export function ControlPanel() {
  const [coolingEnabled, setCoolingEnabled] = useState(false);
  const [heatingEnabled, setHeatingEnabled] = useState(false);
  const [fanSpeed, setFanSpeed] = useState<'low' | 'medium' | 'high'>('medium');
  const [dehumidifierEnabled, setDehumidifierEnabled] = useState(false);

  const handleCoolingToggle = (checked: boolean) => {
    if (checked) {
      setHeatingEnabled(false);
    }
    setCoolingEnabled(checked);
  };

  const handleHeatingToggle = (checked: boolean) => {
    if (checked) {
      setCoolingEnabled(false);
    }
    setHeatingEnabled(checked);
  };

  return (
    <div>
      <div className="bus-card">
        <h2>Πίνακας Ελέγχου Κλιματισμού</h2>
        <p className="bus-card-description">
          Επιλογές για ψύξη ή θέρμανση
        </p>

        {/* Main Controls */}
        <div className="bus-grid bus-grid-cols-2 bus-gap-6 bus-mb-8">
          {/* Cooling Control */}
          <div className={`bus-stat-card ${coolingEnabled ? 'bus-active-blue' : ''}`}>
            <div className="bus-control-card">
              <div className="bus-control-info">
                <div className="bus-icon-badge bus-icon-badge-blue">
                  <SnowflakeIcon className="bus-icon bus-icon-blue" />
                </div>
                <div>
                  <h3 className="bus-mb-1">Ψύξη</h3>
                  <p className="bus-text-sm bus-text-muted">Κλιματισμός</p>
                </div>
              </div>
              <Switch checked={coolingEnabled} onChange={handleCoolingToggle} />
            </div>
            {coolingEnabled && (
              <div className="bus-pt-4 bus-border-t">
                <p className="bus-status-text bus-status-active">✓ Ενεργοποιημένο</p>
              </div>
            )}
          </div>

          {/* Heating Control */}
          <div className={`bus-stat-card ${heatingEnabled ? 'bus-active-orange' : ''}`}>
            <div className="bus-control-card">
              <div className="bus-control-info">
                <div className="bus-icon-badge bus-icon-badge-orange">
                  <FlameIcon className="bus-icon bus-icon-orange" />
                </div>
                <div>
                  <h3 className="bus-mb-1">Θέρμανση</h3>
                  <p className="bus-text-sm bus-text-muted">Καλοριφέρ</p>
                </div>
              </div>
              <Switch checked={heatingEnabled} onChange={handleHeatingToggle} />
            </div>
            {heatingEnabled && (
              <div className="bus-pt-4 bus-border-t">
                <p className="bus-status-text bus-status-active">✓ Ενεργοποιημένο</p>
              </div>
            )}
          </div>
        </div>

        {/* Fan Speed Control */}
        <div className="bus-stat-card bus-mb-6">
          <div className="bus-flex bus-items-center bus-gap-3 bus-mb-4">
            <WindIcon className="bus-stat-icon" />
            <h3>Ταχύτητα Ανεμιστήρα</h3>
          </div>
          <div className="bus-button-group">
            <button
              className={`bus-btn ${fanSpeed === 'low' ? 'bus-btn-primary' : 'bus-btn-outline'}`}
              onClick={() => setFanSpeed('low')}
            >
              Χαμηλή
            </button>
            <button
              className={`bus-btn ${fanSpeed === 'medium' ? 'bus-btn-primary' : 'bus-btn-outline'}`}
              onClick={() => setFanSpeed('medium')}
            >
              Μεσαία
            </button>
            <button
              className={`bus-btn ${fanSpeed === 'high' ? 'bus-btn-primary' : 'bus-btn-outline'}`}
              onClick={() => setFanSpeed('high')}
            >
              Υψηλή
            </button>
          </div>
        </div>

        {/* Additional Options */}
        <div className="bus-stat-card">
          <div className="bus-flex bus-items-center bus-justify-between">
            <div className="bus-flex bus-items-center bus-gap-3">
              <DropletsIcon className="bus-stat-icon" />
              <div>
                <h3>Αφυγραντήρας</h3>
                <p className="bus-text-sm bus-text-muted">Μείωση υγρασίας</p>
              </div>
            </div>
            <Switch checked={dehumidifierEnabled} onChange={setDehumidifierEnabled} />
          </div>
        </div>

        {/* System Status */}
        <div className="bus-mt-6 bus-pt-6 bus-border-t">
          <h3 className="bus-mb-3">Κατάσταση Συστήματος</h3>
          <div className="bus-space-y-2 bus-text-sm">
            <div className="bus-flex bus-justify-between">
              <span className="bus-text-muted">Λειτουργία:</span>
              <span>
                {coolingEnabled ? 'Ψύξη' : heatingEnabled ? 'Θέρμανση' : 'Αναμονή'}
              </span>
            </div>
            <div className="bus-flex bus-justify-between">
              <span className="bus-text-muted">Ανεμιστήρας:</span>
              <span className="bus-capitalize">
                {fanSpeed === 'low' ? 'Χαμηλή' : fanSpeed === 'medium' ? 'Μεσαία' : 'Υψηλή'}
              </span>
            </div>
            <div className="bus-flex bus-justify-between">
              <span className="bus-text-muted">Αφυγραντήρας:</span>
              <span>{dehumidifierEnabled ? 'Ενεργός' : 'Ανενεργός'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
