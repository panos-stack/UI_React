import { useState, useEffect } from 'react';
import { BusVisualization } from './components/BusVisualization';
import { CleaningMethodSelector } from './components/CleaningMethodSelector';
import { SelectionSummary } from './components/SelectionSummary';
import { Clock, CheckCircle } from 'lucide-react';

export interface CleaningSelection {
  spot: string;
  methods: string[];
}

export default function App() {
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);
  const [selections, setSelections] = useState<CleaningSelection[]>([]);
  const [appState, setAppState] = useState<'selecting' | 'cleaning' | 'complete'>('selecting');
  const [totalTime, setTotalTime] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const methodTimes: Record<string, number> = {
    'basic-wash': 1,
    'deep-clean': 3,
    'polish': 10,
    'sanitize': 8,
    'pressure-wash': 2,
    'detail': 6 
  };

  // Countdown timer effect
  useEffect(() => {
    if (appState === 'cleaning' && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            setAppState('complete');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [appState, remainingTime]);

  const handleSpotSelect = (spot: string) => {
    setSelectedSpot(spot);
  };

  const handleMethodsUpdate = (methods: string[]) => {
    if (!selectedSpot) return;

    setSelections(prev => {
      const existing = prev.find(s => s.spot === selectedSpot);
      if (existing) {
        if (methods.length === 0) {
          return prev.filter(s => s.spot !== selectedSpot);
        }
        return prev.map(s => 
          s.spot === selectedSpot ? { spot: selectedSpot, methods } : s
        );
      } else if (methods.length > 0) {
        return [...prev, { spot: selectedSpot, methods }];
      }
      return prev;
    });
  };

  const getSelectedMethods = (spot: string): string[] => {
    return selections.find(s => s.spot === spot)?.methods || [];
  };

  const handleClear = (spot: string) => {    
    setSelections(prev => prev.filter(s => s.spot !== spot));
    if (selectedSpot === spot) {
      setSelectedSpot(null);
    }
  }

  const handleClearAll = () => {
    setSelections([]);
    setSelectedSpot(null);
  };

  const handleConfirm = () => {
    const total = selections.reduce((acc, selection) => {
      return acc + selection.methods.reduce((sum, method) => sum + methodTimes[method], 0);
    }, 0);
    setTotalTime(total);
    setRemainingTime(total*60);
    setAppState('cleaning');
  };

  const handleSkip = () => {
    setAppState('complete');
  };

  const handleReset = () => {
    setSelections([]);
    setSelectedSpot(null);
    setAppState('selecting');
    setTotalTime(0);
    setRemainingTime(0);
  };

  const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

  // Countdown view
  if (appState === 'cleaning') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md w-full">
          <div className="mb-6">
            <Clock className="w-20 h-20 text-blue-600 mx-auto mb-4 animate-pulse" />
            <h2 className="text-slate-800 mb-2">Cleaning in Progress</h2>
          </div>
          <div className="bg-blue-50 rounded-xl p-8 mb-6">
            <div className="text-6xl text-blue-600 mb-2">{formatTime(remainingTime)}</div>
            <div className="text-sm text-slate-600">Remaining</div>
          </div>
          <div className="text-slate-500 text-sm mb-6">
            Total time: {formatTime(totalTime*60)}
          </div>
          <button 
            onClick={handleSkip}
            className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 rounded-lg transition-colors"
          >
            Skip Countdown
          </button>
        </div>
      </div>
    );
  }

  // Completion view
  if (appState === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-100 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md w-full">
          <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6" />
          <h2 className="text-slate-800 mb-4">The bus is now clean!</h2>
          <p className="text-slate-600 mb-8">All selected areas have been cleaned successfully. No valuable items have been found</p>
          <button 
            onClick={handleReset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  // Selection view (default)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-slate-800 mb-2">BerlBus Cleaning Service</h1>
          <p className="text-slate-600">Select areas on the bus and choose your preferred cleaning methods</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BusVisualization 
              onSpotSelect={handleSpotSelect}
              selectedSpot={selectedSpot}
              selections={selections}
            />
          </div>

          <div className="space-y-6">
            <CleaningMethodSelector 
              selectedSpot={selectedSpot}
              selectedMethods={selectedSpot ? getSelectedMethods(selectedSpot) : []}
              onMethodsUpdate={handleMethodsUpdate}
            />

            <SelectionSummary 
              selections={selections}
              onClearAll={handleClearAll}
              onClear={handleClear}
              onStartCleaning={handleConfirm}
              appState={appState}
              totalTime={totalTime}
              remainingTime={remainingTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
}