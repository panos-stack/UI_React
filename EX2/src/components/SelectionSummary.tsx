import { Trash2, CheckCircle, Clock } from 'lucide-react';
import { CleaningSelection } from '../App';

interface SelectionSummaryProps {
  selections: CleaningSelection[];
  onClearAll: () => void;
  onClear: (spot: string) => void;
  onStartCleaning: () => void;
  appState: string;
  totalTime: number;
  remainingTime: number;
}

const methodNames: Record<string, string> = {
  'basic-wash': 'Basic Wash',
  'deep-clean': 'Deep Clean',
  'polish': 'Polish & Wax',
  'sanitize': 'Sanitize',
  'pressure-wash': 'Pressure Wash',
  'detail': 'Detail Clean'
};

const methodTimes: Record<string, Number> = {
  'basic-wash': 1,
  'deep-clean': 3,
  'polish': 10,
  'sanitize': 8,
  'pressure-wash': 2,
  'detail': 6
};

export function SelectionSummary({ selections, onClearAll, onClear, onStartCleaning, appState, totalTime, remainingTime }: SelectionSummaryProps) {
  if (selections.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-slate-800 mb-4">Summary</h2>
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">No areas selected yet</p>
        </div>
      </div>
    );
  }

  const totalMethods = selections.reduce((sum, s) => sum + s.methods.length, 0);

  const calculateSelectionTime = (methods: string[]): number => {
    return methods.reduce((sum, method) => sum + (Number(methodTimes[method]) || 0), 0);
  };

  const totalTimeCalc = selections.reduce((sum, selection) => {
    return sum + calculateSelectionTime(selection.methods);
  }, 0);

  const formatSpotName = (spot: string) => {
    return spot.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-slate-800">Summary</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-blue-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{totalTimeCalc} min</span>
          </div>
          <button
            onClick={onClearAll}
            className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
            title="Clear all selections"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-blue-600">{selections.length}</div>
            <div className="text-xs text-slate-600">Areas Selected</div>
          </div>
          <div>
            <div className="text-blue-600">{totalMethods}</div>
            <div className="text-xs text-slate-600">Total Methods</div>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {selections.map(selection => {
          const selectionTime = calculateSelectionTime(selection.methods);
          
          return (
          <div 
            key={selection.spot}
            className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-slate-800">{formatSpotName(selection.spot)}</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-slate-600">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{selectionTime} min</span>
                </div>
                <button
                onClick={() => onClear(selection.spot)}
                className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                title="Clear this selection"
                >
                <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-1">
              {selection.methods.map(method => (
                <div 
                  key={method}
                  className="text-xs text-slate-600 bg-slate-50 rounded px-2 py-1 inline-block mr-1 mb-1"
                >
                  {methodNames[method] || method}
                </div>
              ))}
            </div>
          </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200">
        <button 
          onClick={onStartCleaning}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
        >
          Confirm Choices
        </button>
      </div>
    </div>
  );
}