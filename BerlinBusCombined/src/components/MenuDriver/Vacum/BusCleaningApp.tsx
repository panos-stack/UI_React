import { useState, useEffect } from 'react';
import { BusVisualization } from './BusVisualization';
import { CleaningMethodSelector } from './CleaningMethodSelector';
import { SelectionSummary } from './SelectionSummary';
import { Clock, CheckCircle } from 'lucide-react';
import './index.css';

export interface CleaningSelection {
  spot: string;
  methods: string[];
}

export function BusCleaningApp() {
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);
  const [selections, setSelections] = useState<CleaningSelection[]>([]);
  const [appState, setAppState] = useState<'selecting' | 'cleaning' | 'complete'>('selecting');
  const [totalTime, setTotalTime] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [wholeBusMethods, setWholeBusMethods] = useState<string[]>([]);
  const methodTimes: Record<string, number> = {
    'basic-wash': 1,
    'deep-clean': 3,
    'polish': 10,
    'sanitize': 8,
    'pressure-wash': 2,
    'detail': 6 
  };

  const allSpotIds = [
    'windshield', 'dashboard', 'front-mirror-left', 'front-mirror-right',
    'steps', 'seats-row1-left', 'seats-row2-left', 'seats-row2-right',
    'seats-row3-left', 'seats-row3-right', 'seats-row4-left', 'seats-row4-right',
    'seats-row5-left', 'seats-row5-right', 'seats-row6-left', 'seats-row6-right',
    'seats-row7-left', 'seats-row7-right', 'seats-row8-left', 'seats-row8-right',
    'seats-row9-left', 'seats-row9-right', 'seats-row10-left', 'seats-row10-middle',
    'seats-row10-right', 'aisle', 'windows-left', 'windows-right'
  ];

  const finds = [
    'Wallet', 
    'Smartphone',
    'Keys',
    'Sunglasses',
    'Purse',
    'Cash',
    'Card',
    'Passport',
    'ID'
  ];

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
    // If selecting a regular spot while in whole-bus mode, exit whole-bus mode
    if (spot !== 'whole-bus') {
      setWholeBusMethods([]);
    }
  };

  const handleMethodsUpdate = (methods: string[]) => {
    if (!selectedSpot) return;
    // If in whole-bus mode, apply to all spots
    if (selectedSpot === 'whole-bus') {
      setWholeBusMethods(methods);
      
      if (methods.length === 0) {
        // Clear all selections
        setSelections([]);
      } else {
        // Apply methods to all spots
        const newSelections: CleaningSelection[] = allSpotIds.map(spot => ({
          spot,
          methods
        }));
        setSelections(newSelections);
      }
      return;
    }

    // Regular spot handling
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
    if (spot === 'whole-bus') {
      return wholeBusMethods;
    }
    return selections.find(s => s.spot === spot)?.methods || [];
  };

  const handleClear = (spot: string) => {    
    setSelections(prev => prev.filter(s => s.spot !== spot));
    if (selectedSpot === spot) {
      setSelectedSpot(null);
    }
    // Exit whole-bus mode if clearing spots
    setWholeBusMethods([])
  }

  const handleClearAll = () => {
    setSelections([]);
    setSelectedSpot(null);
    setWholeBusMethods([]);
  };

  const handleSelectWholeBus = () => {
    setSelectedSpot('whole-bus');
    // Set default methods if there are existing whole-bus methods
    if (wholeBusMethods.length > 0) {
      const newSelections: CleaningSelection[] = allSpotIds.map(spot => ({
        spot,
        methods: wholeBusMethods
      }));
      setSelections(newSelections);
    }
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
    setWholeBusMethods([]);
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
    const num = Math.floor(Math.random() * (finds.length + 1));
    let foundItems = [] ;
    if (num === 0){
      foundItems = null;
    }
    else {
      for (let i = 0; i < num; i++){
        const item = Math.floor(Math.random() * num);
        foundItems.push(finds[item]);
      }
    }
    console.log(foundItems);
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-100 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md w-full">
          <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6" />
          <h2 className="text-slate-800 mb-4">The bus is now clean!</h2>
          <p className="text-slate-600 mb-8">All selected areas have been cleaned successfully. A total of {num} items has been found.
          { <p> The items are:
              {foundItems.map(item => (
            <div key={item}>{item}</div>
          ))}
          </p>
          }
          </p>
          <button 
            onClick={handleReset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
          >
            Clean another Bus
          </button>
        </div>
      </div>
    );
  }

  // Selection view (default)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BusVisualization 
              onSpotSelect={handleSpotSelect}
              selectedSpot={selectedSpot}
              selections={selections}
              onSelectWholeBus={handleSelectWholeBus}
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
