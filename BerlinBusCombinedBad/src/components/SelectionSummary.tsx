import { Trash2, Edit3, CheckCircle } from 'lucide-react';
import { CleaningSelection } from './BusCleaningApp';

interface SelectionSummaryProps {
  selections: CleaningSelection[];
  onClearAll: () => void;
  onEditSpot: (spot: string) => void;
  onConfirmBooking: () => void;
}

const methodNames: Record<string, string> = {
  'basic-wash': 'Basic Wash',
  'deep-clean': 'Deep Clean',
  'polish': 'Polish & Wax',
  'sanitize': 'Sanitize',
  'pressure-wash': 'Pressure Wash',
  'detail': 'Detail Clean'
};

export function SelectionSummary({ selections, onClearAll, onEditSpot, onConfirmBooking }: SelectionSummaryProps) {
  if (selections.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-slate-800 mb-4">Summary</h2>
      </div>
    );
  }

  const totalMethods = selections.reduce((sum, s) => sum + s.methods.length, 0);

  const formatSpotName = (spot: string) => {
    return spot.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-slate-800">Summary</h2>
        <button
          onClick={onClearAll}
          className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
          title="Clear all selections"
        >
          <Trash2 className="w-4 h-4" />
        </button>
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

      <div className="mt-6 pt-4 border-t border-slate-200">
        <button
          onClick={onConfirmBooking}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}