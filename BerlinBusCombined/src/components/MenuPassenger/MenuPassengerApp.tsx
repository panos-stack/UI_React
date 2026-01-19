import { useState } from 'react';
import { ArrowLeft, Info} from 'lucide-react';
import { CoffeeOrderingApp } from './Coffee/CoffeeOrderingApp';
import { DriverView } from './DriverView';
import { HistoricalSights } from './HistoricalSights';
import { MapView } from './MapView';
import './stylesPassenger.css';

import orderSteps from './images/order.jpg';

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
  { id: 'home', label: 'Home', component: DriverView },
  { id: 'sights', label: 'Historical Sights', component: HistoricalSights },
  { id: 'coffeeOrdering', label: 'Coffee Ordering', component: CoffeeOrderingApp },
  { id: 'tour', label: 'Navigation for Tourists', component: MapView }
]

const guidesByMenu: Record<string, GuideItem[]> = {
  home: [
    {
      id: "noInfo",
      description: "No action is required from the user. The current feature exists in order to make the user experience easier. Select an action from the Menu to get started..",
    },
  ],
  sights: [
    {
      id: "shortReferenceManual",
      title: "Short Reference Manual",
      description: "Sights: \n Detailed information on the sights of Berlin.",
    },
    {
      id: "fullReferenceManual",
      title: "Full Reference Manual",
      description: "Details: \n\n 1. Sight Selection: \n The user can choose one of the available sights and get plenty of information about it.",
    },
  ],
  coffeeOrdering: [
    {
      id: "quickStartQuide",
      title: "Quick Start Guide",
      image: orderSteps,
    },
    {
      id: "shortReferenceManual",
      title: "Short Reference Manual",
      description: "Shop List: \n The user selects the coffee shop to which he would like to make an order. \n\n Drink Selection: \n The user chooses the desired beverage. \n\n Bus stops: The user chooses the bus stop where he would like to have his order delivered. \n\n Payment: \n The user chooses payment method. \n\n Card Fields: The user fills in his card details. \n\n Confirmation Button: \n Finalizes the user choices and begins the order preperation. \n\n ",
    },
    {
      id: "fullReferenceManual",
      title: "Full Reference Manual",
      description: "Details: \n\n 1. Coffee Shop Selection: \n The user can choose the coffee shop based on his preferences, distance and any available discounts. \n\n 2. Drink Selection: \n After the user has chosen the desirable coffee shop, he is able to order from the provided catalog. Then the estimated time for preperation and delivery appears and if the user approves the choices are finalized. \n\n 3.	Bus Stop Selection: \n At this point the user is porvided with a map with the available bus stops to select from. The list bus stops provided is based on the estimated time and the current bus route. \n\n 4.	Order Completion: \n At this point, the user is directed to a page in which he chooses payment method, enters his card information and when these are approved he receives the electronic receipt. Finally, a countdown appears with the estimated time for delivery."
    },
  ],
  tour: [
    {
      id: "shortReferenceManual",
      title: "Short Reference Manual",
      description: "Map: \n Interactive map of Berlin City with the route stops and nearby restaurants. \n\n Choices: \n Controls whether the route and restaurants are displayed on the map with the simple press of a button.", 
    },
    {
      id: "fullReferenceManual",
      title: "Full Reference Manual",
      description: "Details: \n\n 1. 'Show Restaurant' Choice: \n With this option, the user can choose whether nearby restaurants will be displayed on the map. \n\n 'Show Bus Route' Choice: \n With this option, the user can choose the bus route will be displayed on the map. The bus stops will remain visible regardless of the user's choice.",
    },
  ],
};

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
          <p>{guide.description}</p>
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

interface MenuPassengerAppProps {
  onBack: () => void;
}

export function MenuPassengerApp({ onBack }: MenuPassengerAppProps) {
  const [activeMenu, setActiveMenu] = useState<string>('home');
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const ActiveComponent = menuItems.find(item => item.id === activeMenu)?.component || DriverView;

  return (
    <div className="bus-app-container">
      {/* Left Sidebar */}
      <aside className={`bus-left-sidebar ${isLeftSidebarOpen ? 'left-open' : 'left-closed'}`}>

      <div className="flex items-center gap-2 p-2" style = {{display: "flex", alignItems: "center", padding: "8px"}}>
      {/* Return to main screen */}
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" style={{padding: "8px", borderRadius: "8px", cursor: "pointer"}}>
          <ArrowLeft className="w-6 h-6" size = {24} />
        </button>
        <h2 style={{ fontWeight: "bold", margin: 0, marginRight: "auto", lineHeight: "24px" }}>Menu</h2>
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
              setIsRightSidebarOpen(!isRightSidebarOpen); 
              setIsLeftSidebarOpen(isRightSidebarOpen);
            }}
          >
            <Info/>
          </button>
        </header>

        {/* Content Area */}
        <main className="bus-content-area">
          {activeMenu === 'home' ? <DriverView /> : <ActiveComponent />}
        </main>
      </div>

      {/* Right Sidebar */}
      <aside className={`bus-right-sidebar ${isRightSidebarOpen ? 'right-open' : 'right-closed'}`}>
      <div className="bus-right-sidebar-content">
        <h2  style={{ fontWeight: "bold"}}>Information</h2>
        {<RightSidebarGuide guides={guidesByMenu[activeMenu]}/>}
      </div>
      </aside>
    </div>
  );
}