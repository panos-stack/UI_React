import { useState } from 'react';
import { BusCleaningApp } from './components/BusCleaningApp';
import { CoffeeOrderingApp } from './components/CoffeeOrderingApp';
import { Bus, Coffee } from 'lucide-react';

type AppView = 'menu' | 'bus' | 'coffee';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('menu');

  if (currentView === 'bus') {
    return <BusCleaningApp onBack={() => setCurrentView('menu')} />;
  }

  if (currentView === 'coffee'){
    return <CoffeeOrderingApp onBack={() => setCurrentView('menu')}/>
  }

  // Main menu
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-slate-800 mb-2">BerlBus</h1>
          <p className="text-slate-600">Welcome to BerlBus Services! Select a service to get started</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Bus Cleaning App Card */}
          <button
            onClick={() => setCurrentView('bus')}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all hover:scale-105 active:scale-95 group"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center group-hover:from-blue-500 group-hover:to-blue-700 transition-colors">
                <Bus className="w-12 h-12 text-white" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-slate-800 mb-2">Bus Cleaning</h2>
                <p className="text-slate-600 text-sm">Select and clean specific areas of your bus</p>
              </div>
            </div>
          </button>

          {/* Coffee App Card */}
          <button
            onClick={() => setCurrentView('coffee')}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all hover:scale-105 active:scale-95 group"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center group-hover:from-amber-500 group-hover:to-orange-700 transition-colors">
                <Coffee className="w-12 h-12 text-white" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-slate-800 mb-2">Coffee Service</h2>
                <p className="text-slate-600 text-sm">Order and customize your coffee</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
