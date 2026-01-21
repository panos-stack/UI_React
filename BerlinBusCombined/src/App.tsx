import { useState } from 'react';
import { Users, User } from 'lucide-react';
import { MenuDriverApp } from './components/MenuDriver/MenuDriverApp';
import { MenuPassengerApp } from './components/MenuPassenger/MenuPassengerApp';
import Bus from './styles/Bus-Tours-Berlin-Image.jpg';

type AppView = 'main' | 'driver' | 'passenger';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('main');

  if (currentView === 'driver'){
    return <MenuDriverApp onBack={() => setCurrentView('main')}/>
  }

  if (currentView === 'passenger'){
    return <MenuPassengerApp onBack={() => setCurrentView('main')}/>
  }

  // Main menu
  return (    
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8" style={{backgroundImage: `url(${Bus})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat"}}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12" >
          <h1 className="text-slate-800 mb-2 mx-auto" style={{display: "table", backgroundColor: "rgba(255, 255, 255, 0.7)", borderRadius: 10, paddingRight: 10, paddingLeft: 10}}>BerlBus</h1>
          <p className="text-slate-600 mb-2 mx-auto" style={{display: "table", backgroundColor: "rgba(255, 255, 255, 0.7)", borderRadius: 10, paddingRight: 10, paddingLeft: 10}}>Welcome to BerlBus Services! Select a profile</p>
        </div>
        

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Bus Cleaning App Card */}
          <button
            onClick={() => setCurrentView('driver')}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all hover:scale-105 active:scale-95 group" style={{backgroundColor: "rgba(255, 255, 255, 0.5)"}}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center group-hover:from-blue-500 group-hover:to-blue-700 transition-colors">
                <User className="w-12 h-12 text-white" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-slate-800 mb-2">Driver profile</h2>
              </div>
            </div>
          </button>

          {/* Coffee App Card */}
          <button
            onClick={() => setCurrentView('passenger')}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all hover:scale-105 active:scale-95 group" style={{backgroundColor: "rgba(255, 255, 255, 0.5)"}}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center group-hover:from-amber-500 group-hover:to-orange-700 transition-colors">
                <Users className="w-12 h-12 text-white" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-slate-800 mb-2">Passenger profile</h2>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}