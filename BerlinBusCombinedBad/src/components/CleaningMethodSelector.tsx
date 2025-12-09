import { Droplets, Sparkles, Shield, Wind, Brush, Zap } from 'lucide-react';

interface CleaningMethodSelectorProps {
  selectedSpot: string | null;
  selectedMethods: string[];
  onMethodsUpdate: (methods: string[]) => void;
}

const cleaningMethods = [
  {
    id: 'basic-wash',
    name: 'Basic Wash',
    icon: Droplets,
    color: 'blue'
  },
  {
    id: 'deep-clean',
    name: 'Deep Clean',
    icon: Sparkles,
    color: 'blue'
  },
  {
    id: 'polish',
    name: 'Polish & Wax',
    icon: Zap,
    color: 'blue'
  },
  {
    id: 'sanitize',
    name: 'Sanitize',
    icon: Shield,
    color: 'blue'
  },
  {
    id: 'pressure-wash',
    name: 'Pressure Wash',
    icon: Wind,
    color: 'blue'
  },
  {
    id: 'detail',
    name: 'Detail Clean',
    icon: Brush,
    color: 'blue'
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
      </div>
    );
  }

  const spotName = selectedSpot.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-4">
        <h2 className="text-slate-800">Cleaning Methods</h2>
        <p className="text-slate-600 text-sm mt-1">For: <span>{spotName}</span></p>
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
                  <div className={`transition-colors ${isSelected ? colors.text : 'text-slate-700'}`}>
                    {method.name}
                  </div>
                </div>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  isSelected 
                    ? `${colors.border} ${colors.bg}` 
                    : 'border-slate-300'
                }`}>
                  {isSelected && (
                    <div className={`w-2.5 h-2.5 rounded-sm ${colors.border.replace('border', 'bg')}`} />
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
