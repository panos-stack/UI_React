import { useEffect, useState } from 'react';

function ThermometerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
    </svg>
  );
}

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

function CloudIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
    </svg>
  );
}

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

export function TemperatureControl() {
  const [targetTemp, setTargetTemp] = useState(22);
  const [currentTemp, setCurrentTemp] = useState(25);
  const [outsideTemp] = useState(30);
  const [humidity] = useState(65);

  const getMode = () => {
    if (targetTemp < currentTemp) return 'cooling';
    if (targetTemp > currentTemp) return 'heating';
    return 'idle';
  };

  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentTemp(prevTemp => {
      const step = 1;

      if (prevTemp < targetTemp) return Math.min(prevTemp + step, targetTemp);
      if (prevTemp > targetTemp) return Math.max(prevTemp - step, targetTemp);

      return prevTemp;
    });

  }, 5000);

  
    return () => clearInterval(interval);
  }, [currentTemp, targetTemp]);

  const mode = getMode();

  return (
    <div>
      <div className="bus-card">
        <h2>Ρύθμιση Θερμοκρασίας</h2>
        <p className="bus-card-description">
          Ρύθμιση θερμοκρασίας ανάλογα με τις συνθήκες
        </p>

        {/* Current Conditions */}
        <div className="bus-grid bus-grid-cols-3 bus-mb-8">
          <div className="bus-stat-card">
            <div className="bus-stat-header">
              <ThermometerIcon className="bus-stat-icon bus-icon-blue" />
              <span>Τρέχουσα</span>
            </div>
            <div className="bus-stat-value">{currentTemp}°C</div>
          </div>

          <div className="bus-stat-card">
            <div className="bus-stat-header">
              <SunIcon className="bus-stat-icon bus-icon-orange" />
              <span>Εξωτερική</span>
            </div>
            <div className="bus-stat-value">{outsideTemp}°C</div>
          </div>

          <div className="bus-stat-card">
            <div className="bus-stat-header">
              <CloudIcon className="bus-stat-icon" />
              <span>Υγρασία</span>
            </div>
            <div className="bus-stat-value">{humidity}%</div>
          </div>
        </div>

        {/* Temperature Control */}
        <div className="bus-space-y-6">
          <div>
            <div className="bus-flex bus-items-center bus-justify-between bus-mb-4">
              <label>Επιθυμητή Θερμοκρασία</label>
              <div className="bus-flex bus-items-center bus-gap-2">
                <span className={`bus-badge ${mode === 'cooling' ? 'bus-badge-default' : mode === 'heating' ? 'bus-badge-destructive' : 'bus-badge-secondary'}`}>
                  {mode === 'cooling' && (<span style={{ width: '12px', height: '12px', marginRight: '4px' }}> <SnowflakeIcon className="bus-stat-icon" /> </span>)}
                  {mode === 'heating' && (<span style={{ width: '12px', height: '12px', marginRight: '4px' }}> <SunIcon className="bus-stat-icon" /> </span>)}
                  {mode === 'cooling' ? 'Ψύξη' : mode === 'heating' ? 'Θέρμανση' : 'Αναμονή'}
                </span>
                <span className="bus-text-2xl">{targetTemp}°C</span>
              </div>
            </div>
            <input
              type="range"
              className="bus-slider"
              value={targetTemp}
              onChange={(e) => setTargetTemp(Number(e.target.value))}
              min={16}
              max={28}
              step={0.5}
            />
            <div className="bus-slider-label">
              <span>16°C</span>
              <span>28°C</span>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="bus-pt-4 bus-border-t">
            <p className="bus-text-sm bus-mb-3">Γρήγορες Ρυθμίσεις:</p>
            <div className="bus-demo-controls">
              <button
                onClick={() => setTargetTemp(18)}
                className="bus-preset-btn bus-preset-btn-cool"
              >
                Ψύχρο (18°C)
              </button>
              <button
                onClick={() => setTargetTemp(22)}
                className="bus-preset-btn bus-preset-btn-comfort"
              >
                Άνετο (22°C)
              </button>
              <button
                onClick={() => setTargetTemp(25)}
                className="bus-preset-btn bus-preset-btn-warm"
              >
                Θερμό (25°C)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}