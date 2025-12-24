import { useState } from 'react';
import { DrivingAssistance } from './DrivingAssistance';
import { TemperatureControl } from './TemperatureControl';
import { ControlPanel } from './ControlPanel';
import { RoofManagement } from './RoofManagement';
import { BusCleaningApp } from './Vacum/BusCleaningApp';
import { ArrowLeft } from 'lucide-react';
import './stylesDriver.css';

type MenuItem = {
  id: string;
  label: string;
  component: React.ComponentType;
};

const menuItems: MenuItem[] = [
  { id: 'home', label: 'Αρχική', component: () => null },
  { id: 'driving', label: 'Βοήθεια στην Οδήγηση', component: DrivingAssistance },
  { id: 'temperature', label: 'Ρύθμιση Θερμοκρασίας', component: TemperatureControl },
  { id: 'control', label: 'Πίνακας Ελέγχου', component: ControlPanel },
  { id: 'roof', label: 'Διαχείριση Οροφής', component: RoofManagement },
  // Vacum added
  { id: 'robotVacum', label: 'Σκούπα ρομποτ', component: BusCleaningApp}
];

function HomePage() {
  return (
    <div className="bus-home-page">
      <h1>Σύστημα Διαχείρισης Λεωφορείου</h1>
      <p>Επιλέξτε μια λειτουργία από το μενού</p>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );
}

interface MenuDriverAppProps {
  onBack: () => void;
}

export function MenuDriverApp({ onBack }: MenuDriverAppProps) {
  const [activeMenu, setActiveMenu] = useState<string>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const ActiveComponent = menuItems.find(item => item.id === activeMenu)?.component || HomePage;

  return (
    <div className="bus-app-container">
      {/* Sidebar */}
      <aside className={`bus-sidebar ${isSidebarOpen ? 'bus-open' : 'bus-closed'}`}>

      {/* Return to main screen */}
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="bus-sidebar-content">
          <h2>Μενού</h2>
          <nav className="bus-nav-menu">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`bus-nav-button ${activeMenu === item.id ? 'bus-active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="bus-main-content">
        {/* Header */}
        <header className="bus-header">
          <button
            className="bus-menu-button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <MenuIcon />
          </button>
          <h1>
            {menuItems.find(item => item.id === activeMenu)?.label || 'Αρχική'}
          </h1>
        </header>

        {/* Content Area */}
        <main className="bus-content-area">
          {activeMenu === 'home' ? <HomePage /> : <ActiveComponent />}
        </main>
      </div>
    </div>
  );
}