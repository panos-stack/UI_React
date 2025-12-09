import { useState, useEffect } from 'react';
import { BusVisualization } from './BusVisualization';
import { CleaningMethodSelector } from './CleaningMethodSelector';
import { SelectionSummary } from './SelectionSummary';
import { ArrowLeft } from 'lucide-react';

export interface CleaningSelection {
  spot: string;
  methods: string[];
}

interface BusCleaningAppProps {
  onBack: () => void;
}

export function BusCleaningApp({ onBack }: BusCleaningAppProps) {
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);
  const [selections, setSelections] = useState<CleaningSelection[]>([]);
  const [showStartingMessage, setShowStartingMessage] = useState(false);

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

  const handleClearAll = () => {
    setSelections([]);
    setSelectedSpot(null);
  };

  const handleConfirmBooking = () => {
    setShowStartingMessage(true);
  };

  useEffect(() => {
    if (showStartingMessage) {
      const timer = setTimeout(() => {
        setShowStartingMessage(false);
        setSelections([]);
        setSelectedSpot(null);
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [showStartingMessage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-8">
      {showStartingMessage && (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
            <div className="text-2xl">Starting Cleaning</div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="text-center">
            <h1 className="text-slate-800 mb-2">Bus Cleaning Service</h1>
          </div>
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
              onEditSpot={setSelectedSpot}
              onConfirmBooking={handleConfirmBooking}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
