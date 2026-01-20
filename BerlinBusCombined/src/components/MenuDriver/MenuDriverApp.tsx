import { useState } from 'react';
import { DrivingAssistance } from './DrivingAssistance';
import { TemperatureControl } from './TemperatureControl';
import { ControlPanel } from './ControlPanel';
import { RoofManagement } from './RoofManagement';
import { BusCleaningApp } from './Vacum/BusCleaningApp';
import { ArrowLeft, Info} from 'lucide-react';
import './stylesDriver.css';
import spotSelection from './images/Spot Selection.png';
import BusDrivingGif from './images/wmremove-transformed.gif';

type MenuItem = {
  id: string;
  label: string;
  component: React.ComponentType;
};

type GuideItem = {
  id: string;
  title?: string;
  description?: string;
  image?: string;
};

const menuItems: MenuItem[] = [
  { id: 'home', label: 'Home', component: () => null },
  { id: 'driving', label: 'Driving Assistance', component: DrivingAssistance },
  { id: 'temperature', label: 'Temperature Control', component: TemperatureControl },
  { id: 'control', label: 'Control Panel', component: ControlPanel },
  { id: 'roof', label: 'Roof Management', component: RoofManagement },
  { id: 'robotVacum', label: 'Bus Cleaning', component: BusCleaningApp}
];

const guidesByMenu: Record<string, GuideItem[]> = {
  home: [
    {
      id: "noInfo",
      description: "There are no available information. Select an action from the Menu to get started."
    }
  ],
  driving: [
    {
      id: "shortReferenceManual",
      title: "Short Reference Manual",
      description: "Speedometer: \n Speed monitoring. \n\n Button 'Stop': \n Carries out a stop.",
    },
    {
      id: "fullReferenceManual",
      title: "Full Reference Manual",
      description: "Details: \n\n 1. Speedometer: \n The user can monitor the updates of the current speed of the bus. Also, if the current speed exceeds the speed limit and a bus wheel is not in the correct lane, a message appears on the driver's screen suggesting that the driver should make a stop to get some rest and maybe a coffee. \n\n 2. Button 'Stop': \n By pressing this button the driver opens the doors for the passengers to get off the bus and is getting updates on whether he can close the doors or not.",
    },
  ],
  temperature: [    
    {
      id: "shortReferenceManual",
      title: "Sort Reference Manual",
      description: "Temperature Adjustment: \n Manual Temperature Adjustment. \n\n Quick Options: \n Quick selection between specific temperature options.",
    },
    {
      id: "fullReferenceManual",
      title: "Full Reference Manual",
      description: "Details: \n\n 1. Temperature Adjustment: \n The user can get get updates about the current weather conditions both inside and outside of the bus and adjust the inside temperature accordingly. \n\n 2. Quick Options: \n The driver can easily change the temperature inside the bus with the simple press of a button. This function is extremely helpful for the driver as it is reducing the risk of him getting distracted. The only thing he has to do is to choose between a few predetermined options.",
    },
  ],
  control: [
    {
      id: "shortReferenceManual",
      title: "Short Reference Manual",
      description: "Buttons for Cooling/Heating and Dehumidifier: \n Air-Conditioning Control. \n\n Fan Speed: \n 3 available options (low, medium, high). \n\n System Information: \n Updates on the air-conditioning operation.",
    },
    {
      id: "fullReferenceManual",
      title: "Full Reference Manual",
      description: "Details: \n\n 1. Cooling/Heating: \n The user can activate either the cooling system or the heating but never both of them at the same time. \n\n 2. Fan Speed: \n The user can adjust the speed level of the fan. \n\n 3. Dehumidifier: \n The user is able to activate the humidifier in case if necessary. \n\n 4. System Information: \n The user gets updates about the state of each temperature control system.",
    },
  ],
  roof: [
    {
      id: "shortReferenceManual",
      title: "Short Reference Manual",
      description: "Information on Energy Production: \n Constant updates about the energy produced. \n\n Information on Photovoltaics: \n Updates about the state of each panel. \n\n Statistics: \n Produces feedback and daily statistics.",
    },
    {
      id: "fullReferenceManual",
      title: "Full Reference Manual",
      description: "Αναλυτικές Λειτουργίες: \n\n 1. Διαχείριση Οροφής και Ενέργειας: \n Τα δεδομένα ενημερώνονται ανά συχνά χρονικά διαστήματα ώστε ο χρήστης να μπορεί να καταλάβει αν βοηθά στην παραγωγή ενέργειας ή αν καταναλώνει την ήδη υπάρχουσα. \n\n 2. Κατάσταση Φωτοβολταϊκών: \n Ο χρήστης μπορεί να ενημερωθεί για την κατάσταση της μπαταρίας και τη λειτουργία κάθε πανελ ξεχωριστά \n\n 3. Στατιστικά: \n Ο χρήστης μπορεί να ενημερωθεί για τα στατιστικά της ενέργειας που παράχθηκε καθώς και αυτής που καταναλώθηκε από το λεωφορείο και να εξάγει συμπεράσματα ώστε να βελτιώσει την αξιοποίηση των διαθέσιμων πόρων.",
    },
  ],
  robotVacum: [
    {
      id: "quickStartQuide",
      title: "Quick Start Guide",
      image: spotSelection,
    },
    {
      id: "shortReferenceManual",
      title: "Short Reference Manual",
      description: "Map: \n  Top view of the bus interior.\n\n Selections: \n Displays the available cleaning options.\n\n Confirmation: \n Finalizes the user choices.\n\n Timer: \n Countdown untill the bus cleaning is complete.",
    },
    {
      id: "fullReferenceManual",
      title: "Full Reference Manual",
      description: "Details: \n\n 1. Selection from the map: \n The user is able to select specific spots that need to be cleaned. He is provided with an imap that resembles the interior of the bus from a top view. The available selections are the floor, the steps, the seats, the windows or even the whole bus. \n\n 2. Selection of the cleaning method: \n After the user has selected the cleaning spots, he is provided with a list of cleaning methods to choose from accompanied by the estimated time of completion. Some of the cleaning methods are sweeping, biological purification or cleaning of the exterior of the bus. \n\n 3. Estimated time and cleaning completion: \n At this point, the estimated time of completion is estimated and if the user approves, the the cleaning progress begins. Otherwise, the user changes his selections. \n\n 4.	Report: \n The hoover informs the company about any findings it perceives as important."
    },
  ],
};

function HomePage() {
  return (
    <div className="bus-home-page">
      <h1>Bus Management System </h1>
      <h2>Select an action from the Menu. </h2>
      <p> <img src={BusDrivingGif} style={{ height: innerHeight*5/7 }}/> </p>
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

function RightSidebarGuide({ guides }: { guides: GuideItem[] }) {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  
  return (
    <>
    <div className="guide-list">
      {guides.map(guide => (
        <div key={guide.id} className="guide-item">
          <h3 style={{fontWeight: "bold"}}>{guide.title}</h3>
          <p> {guide.description} </p>
          {guide.image && (

            <div 
                className="thumbnail-container"
                onMouseEnter={() => setHoveredImage(guide.image!)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img 
                  src={guide.image} 
                  alt={guide.title}
                  className="guide-thumbnail"
                />
                <div className="hover-hint">🖱️ Hold the mouse for zoom in.</div>
              </div>
          )}
        </div>
      ))}
    </div>

     {/* Hover Modal */}
      {hoveredImage && (
        <div className="image-hover-modal">
          <div className="modal-backdrop" />
          <div className="modal-content">
            <img 
              src={hoveredImage} 
              alt="Enlarged view"
              className="enlarged-image"
            />
            <div className="modal-instruction">
              Move the mouse for zoom out.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface MenuDriverAppProps {
  onBack: () => void;
}

export function MenuDriverApp({ onBack }: MenuDriverAppProps) {
  const [activeMenu, setActiveMenu] = useState<string>('home');
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const ActiveComponent = menuItems.find(item => item.id === activeMenu)?.component || HomePage;

  return (
    <div className="bus-app-container">
      {/* Left Sidebar */}
      <aside className={`bus-left-sidebar ${isLeftSidebarOpen ? 'left-open' : 'left-closed'}`}>

      <div className="flex items-center gap-2 p-2" style = {{display: "flex", alignItems: "center", padding: "8px"}}>
      {/* Return to main screen */}
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" style={{padding: "8px", borderRadius: "8px", cursor: "pointer"}}>
          <ArrowLeft className="w-6 h-6" size = {24} />
        </button>
        <h2 style={{ fontWeight: "bold", margin: 0, marginRight: "auto", lineHeight: "24px" }} >Menu</h2>
      </div>
      
      <div className="bus-left-sidebar-content">
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
            onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
          >
            <MenuIcon />
          </button>
          <h1>
            {menuItems.find(item => item.id === activeMenu)?.label || 'Αρχική'}
          </h1>
          
          <button 
            style={{ marginLeft: "auto" }}
            className='bus-info'
            onClick={() => {
              const left = isLeftSidebarOpen;
              setIsRightSidebarOpen(!isRightSidebarOpen); 
              setIsLeftSidebarOpen(isRightSidebarOpen);
            }}
          >
            <Info/>
          </button>
        </header>

        {/* Content Area */}
        <main className="bus-content-area">
          {activeMenu === 'home' ? <HomePage /> : <ActiveComponent />}
        </main>
      </div>

      {/* Right Sidebar */}
      <aside className={`bus-right-sidebar ${isRightSidebarOpen ? 'right-open' : 'right-closed'}`}>
      <div className="bus-right-sidebar-content">
          <h2  style={{ fontWeight: "bold", textAlign: 'center', padding: 5}}>Information</h2>
          <RightSidebarGuide guides={guidesByMenu[activeMenu]}/>          
      </div>
      </aside>
    </div>
  );
}