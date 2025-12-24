import { useState, useEffect } from 'react';

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  );
}

function BatteryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect>
      <line x1="23" y1="13" x2="23" y2="11"></line>
    </svg>
  );
}

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  );
}

function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="bus-progress">
      <div className="bus-progress-bar" style={{ width: `${value}%` }}></div>
    </div>
  );
}

export function RoofManagement() {
  const [solarProduction, setSolarProduction] = useState(3.2);
  const [batteryLevel, setBatteryLevel] = useState(75);
  const [energyConsumption, setEnergyConsumption] = useState(2.8);
  const [sunlight] = useState(85);

  useEffect(() => {
    const interval = setInterval(() => {
      setSolarProduction(prev => {
        const variation = (Math.random() - 0.5) * 0.3;
        return Math.max(0, Math.min(5, prev + variation));
      });

      setBatteryLevel(prev => {
        const netEnergy = solarProduction - energyConsumption;
        const batteryChange = netEnergy * 0.5;
        return Math.max(0, Math.min(100, prev + batteryChange));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [solarProduction, energyConsumption]);

  const netProduction = solarProduction - energyConsumption;
  const isCharging = netProduction > 0;

  return (
    <div>
      <div className="bus-card">
        <h2>Διαχείριση Οροφής και Ενέργειας</h2>
        <p className="bus-card-description">
          Φωτοβολταϊκά πάνελ και διαχείριση ενέργειας
        </p>

        {/* Solar Production Overview */}
        <div className="bus-grid bus-grid-cols-4 bus-mb-8">
          <div className="bus-stat-card bus-gradient-yellow">
            <div className="bus-stat-header">
              <SunIcon className="bus-stat-icon bus-icon-yellow" />
              <span>Παραγωγή</span>
            </div>
            <div className="bus-stat-value">{solarProduction.toFixed(1)} kW</div>
            <div className="bus-stat-label">
              Ηλιακή ένταση: {sunlight}%
            </div>
          </div>

          <div className="bus-stat-card bus-gradient-blue">
            <div className="bus-stat-header">
              <ZapIcon className="bus-stat-icon bus-icon-cyan" />
              <span>Κατανάλωση</span>
            </div>
            <div className="bus-stat-value">{energyConsumption.toFixed(1)} kW</div>
            <div className="bus-stat-label">Τρέχουσα</div>
          </div>

          <div className="bus-stat-card bus-gradient-green">
            <div className="bus-stat-header">
              <TrendingUpIcon className="bus-stat-icon bus-icon-green" />
              <span>Καθαρή</span>
            </div>
            <div className="bus-stat-value">
              {netProduction > 0 ? '+' : ''}{netProduction.toFixed(1)} kW
            </div>
            <div className="bus-stat-label">
              <span className={`bus-badge ${isCharging ? 'bus-badge-default' : 'bus-badge-secondary'}`} style={{ fontSize: '0.75rem' }}>
                {isCharging ? 'Φόρτιση' : 'Εκφόρτιση'}
              </span>
            </div>
          </div>

          <div className="bus-stat-card bus-gradient-purple">
            <div className="bus-stat-header">
              <BatteryIcon className="bus-stat-icon bus-icon-purple" />
              <span>Μπαταρία</span>
            </div>
            <div className="bus-stat-value">{batteryLevel.toFixed(0)}%</div>
            <div className="bus-mt-2">
              <ProgressBar value={batteryLevel} />
            </div>
          </div>
        </div>

        {/* Solar Panel Status */}
        <div className="bus-stat-card bus-mb-6">
          <h3 className="bus-mb-4">Κατάσταση Φωτοβολταϊκών</h3>
          <div className="bus-space-y-4">
            <div className="bus-progress-row">
              <span className="bus-text-sm">Πάνελ 1 (Εμπρός)</span>
              <div className="bus-flex bus-items-center bus-gap-2">
                <div className="bus-progress bus-w-32 bus-h-2">
                  <div className="bus-progress-bar" style={{ width: '90%' }}></div>
                </div>
                <span className="bus-text-sm bus-text-muted">90%</span>
              </div>
            </div>
            <div className="bus-progress-row">
              <span className="bus-text-sm">Πάνελ 2 (Μέση)</span>
              <div className="bus-flex bus-items-center bus-gap-2">
                <div className="bus-progress bus-w-32 bus-h-2">
                  <div className="bus-progress-bar" style={{ width: '87%' }}></div>
                </div>
                <span className="bus-text-sm bus-text-muted">87%</span>
              </div>
            </div>
            <div className="bus-progress-row">
              <span className="bus-text-sm">Πάνελ 3 (Πίσω)</span>
              <div className="bus-flex bus-items-center bus-gap-2">
                <div className="bus-progress bus-w-32 bus-h-2">
                  <div className="bus-progress-bar" style={{ width: '92%' }}></div>
                </div>
                <span className="bus-text-sm bus-text-muted">92%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Energy Statistics */}
        <div className="bus-stat-card">
          <h3 className="bus-mb-4">Στατιστικά Ενέργειας (Σήμερα)</h3>
          <div className="bus-grid bus-grid-cols-4 bus-gap-4">
            <div>
              <p className="bus-text-sm bus-text-muted bus-mb-1">Συνολική Παραγωγή</p>
              <p className="bus-text-2xl">24.5 kWh</p>
            </div>
            <div>
              <p className="bus-text-sm bus-text-muted bus-mb-1">Συνολική Κατανάλωση</p>
              <p className="bus-text-2xl">19.2 kWh</p>
            </div>
            <div>
              <p className="bus-text-sm bus-text-muted bus-mb-1">Εξοικονόμηση</p>
              <p className="bus-text-2xl bus-text-green">5.3 kWh</p>
            </div>
            <div>
              <p className="bus-text-sm bus-text-muted bus-mb-1">CO₂ Μείωση</p>
              <p className="bus-text-2xl bus-text-green">2.6 kg</p>
            </div>
          </div>
        </div>

        {/* Demo Controls */}
        <div className="bus-mt-6 bus-pt-6 bus-border-t">
          <p className="bus-text-sm bus-text-muted bus-mb-3">Έλεγχοι Προσομοίωσης:</p>
          <div className="bus-demo-controls">
            <button
              onClick={() => setEnergyConsumption(1.5)}
              className="bus-btn bus-btn-secondary"
            >
              Χαμηλή Κατανάλωση
            </button>
            <button
              onClick={() => setEnergyConsumption(2.8)}
              className="bus-btn bus-btn-secondary"
            >
              Κανονική Κατανάλωση
            </button>
            <button
              onClick={() => setEnergyConsumption(4.2)}
              className="bus-btn bus-btn-secondary"
            >
              Υψηλή Κατανάλωση
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
