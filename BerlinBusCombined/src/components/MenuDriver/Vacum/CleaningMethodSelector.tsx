import { Droplets, Sparkles, Shield, Wind, Brush, Zap, Clock, Check } from 'lucide-react';

interface CleaningMethodSelectorProps {
  selectedSpot: string | null;
  selectedMethods: string[];
  onMethodsUpdate: (methods: string[]) => void;
}

const cleaningMethods = [
  {
    id: 'basic-wash',
    name: 'Basic Wash',
    description: 'Standard soap and water cleaning',
    icon: Droplets,
    color: 'blue',
    time: 1
  },
  {
    id: 'deep-clean',
    name: 'Deep Clean',
    description: 'Intensive cleaning with specialized products',
    icon: Sparkles,
    color: 'purple',
    time: 3
  },
  {
    id: 'polish',
    name: 'Polish & Wax',
    description: 'Shine and protect the surface',
    icon: Zap,
    color: 'yellow',
    time: 10
  },
  {
    id: 'sanitize',
    name: 'Sanitize',
    description: 'Disinfect and eliminate germs',
    icon: Shield,
    color: 'green',
    time: 8
  },
  {
    id: 'pressure-wash',
    name: 'Pressure Wash',
    description: 'High-pressure water cleaning',
    icon: Wind,
    color: 'cyan',
    time: 2
  },
  {
    id: 'detail',
    name: 'Detail Clean',
    description: 'Meticulous attention to every detail',
    icon: Brush,
    color: 'rose',
    time: 6
  }
];

const colorClasses = {
  blue: {
    border: 'border-blue-500',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    icon: 'text-blue-600',
    hover: 'hover:border-blue-400'
  },
  purple: {
    border: 'border-purple-500',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    icon: 'text-purple-600',
    hover: 'hover:border-purple-400'
  },
  yellow: {
    border: 'border-yellow-500',
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    icon: 'text-yellow-600',
    hover: 'hover:border-yellow-400'
  },
  green: {
    border: 'border-green-500',
    bg: 'bg-green-50',
    text: 'text-green-700',
    icon: 'text-green-600',
    hover: 'hover:border-green-400'
  },
  cyan: {
    border: 'border-cyan-500',
    bg: 'bg-cyan-50',
    text: 'text-cyan-700',
    icon: 'text-cyan-600',
    hover: 'hover:border-cyan-400'
  },
  rose: {
    border: 'border-rose-500',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    icon: 'text-rose-600',
    hover: 'hover:border-rose-400'
  }
};

export function CleaningMethodSelector({ selectedSpot, selectedMethods, onMethodsUpdate }: CleaningMethodSelectorProps) {
  const handleMethodToggle = (methodId: string) => {
    if (selectedMethods.includes(methodId)) {
      onMethodsUpdate(selectedMethods.filter(m => m !== methodId));
    } else {
      onMethodsUpdate([...selectedMethods, methodId]);
    }
  };

  if (!selectedSpot) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-slate-800 mb-4">Cleaning Methods</h2>
        <div className="text-center py-12">
          <Droplets className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Select an area on the bus or click "Select Whole Bus" to choose cleaning methods</p>
        </div>
      </div>
    );
  }

  // Check if it's "whole-bus" or a regular spot
  const isWholeBus = selectedSpot === 'whole-bus';
  const spotName = isWholeBus 
    ? 'Whole Bus (All Areas)'
    : selectedSpot.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-4">
        <h2 className="text-slate-800">Cleaning Methods</h2>
        <p className="text-slate-600 text-sm mt-1">For: <span>{spotName}</span></p>
        {isWholeBus && (
          <p className="text-red-600 text-xs mt-1">These methods will be applied to all 28 areas</p>
        )}
      </div>

      <div className="space-y-3">
        {cleaningMethods.map(method => {
          const isSelected = selectedMethods.includes(method.id);
          const Icon = method.icon;
          const colors = colorClasses[method.color as keyof typeof colorClasses];
          
          return (
            <button
              key={method.id}
              onClick={() => handleMethodToggle(method.id)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                isSelected 
                  ? `${colors.border} ${colors.bg}` 
                  : `border-slate-200 bg-white ${colors.hover}`
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${isSelected ? colors.icon : 'text-slate-400'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className={`transition-colors ${isSelected ? colors.text : 'text-slate-700'}`}>
                      {method.name}
                    </div>
                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>{method.time} min</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {method.description}
                  </div>
                </div>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  isSelected 
                    ? `${colors.border} ${colors.bg}` 
                    : 'border-slate-300'
                }`}>
                  {isSelected && (
                    <Check className={`w-3.5 h-3.5 ${colors.icon}`} strokeWidth={3} />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
