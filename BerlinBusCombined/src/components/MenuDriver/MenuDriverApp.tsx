import { useState } from 'react';
import { DrivingAssistance } from './DrivingAssistance';
import { TemperatureControl } from './TemperatureControl';
import { ControlPanel } from './ControlPanel';
import { RoofManagement } from './RoofManagement';
import { BusCleaningApp } from './Vacum/BusCleaningApp';
import { ArrowLeft, Info} from 'lucide-react';
import './stylesDriver.css';
import hooverImage from './images/Hoover_Quick_Start_Guide.png';

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
  { id: 'home', label: 'Αρχική', component: () => null },
  { id: 'driving', label: 'Βοήθεια στην Οδήγηση', component: DrivingAssistance },
  { id: 'temperature', label: 'Ρύθμιση Θερμοκρασίας', component: TemperatureControl },
  { id: 'control', label: 'Πίνακας Ελέγχου', component: ControlPanel },
  { id: 'roof', label: 'Διαχείριση Οροφής', component: RoofManagement },
  { id: 'robotVacum', label: 'Σκούπα ρομποτ', component: BusCleaningApp}
];

const guidesByMenu: Record<string, GuideItem[]> = {
  home: [
    {
      id: "noInfo",
      description: "Δεν υπάρχουν διαθέσιμες πληροφορίες. Επιλέξτε κάποια ενέργεια από το μενού για να ξεκινήσετε."
    }
  ],
  driving: [
    {
      id: "quickStartQuide",
      title: "Σύντομες Σημειώσεις Εκκίνησης",
      image: null,
    },
    {
      id: "shortReferenceManual",
      title: "Εγχειρίδιο Σύντομης Αναφοράς",
      description: null,
    },
    {
      id: "fullReferenceManual",
      title: "Αναλυτικό Εγχειρίδιο Αναφοράς",
      description: null,
    },
  ],
  temperature: [
    {
      id: "quickStartQuide",
      title: "Σύντομες Σημειώσεις Εκκίνησης",
      image: null,
    },
    {
      id: "shortReferenceManual",
      title: "Εγχειρίδιο Σύντομης Αναφοράς",
      description: null,
    },
    {
      id: "fullReferenceManual",
      title: "Αναλυτικό Εγχειρίδιο Αναφοράς",
      description: null,
    },
  ],
  control: [
    {
      id: "quickStartQuide",
      title: "Σύντομες Σημειώσεις Εκκίνησης",
      image: null,
    },
    {
      id: "shortReferenceManual",
      title: "Εγχειρίδιο Σύντομης Αναφοράς",
      description: null,
    },
    {
      id: "fullReferenceManual",
      title: "Αναλυτικό Εγχειρίδιο Αναφοράς",
      description: null,
    },
  ],
  roof: [
    {
      id: "shortReferenceManual",
      title: "Εγχειρίδιο Σύντομης Αναφοράς",
      description: "Πληροφορίες Παραγωγής Ενέργειας: \n Διαρκής ενημέρωση για την ενέργεια. \n\n Πληροφορίες Φωτοβολταϊκών: \n Ενημερώνει για την κατάσταση των πανελ. \n\n Στατιστικά: \n Παράγει και εμφανίζει στατιστικά δεδομένα.",
    },
    {
      id: "fullReferenceManual",
      title: "Αναλυτικό Εγχειρίδιο Αναφοράς",
      description: "Αναλυτικές Λειτουργίες: \n\n 1. Διαχείριση Οροφής και Ενέργειας: \n Τα δεδομένα ενημερώνονται ανά συχνά χρονικά διαστήματα ώστε ο χρήστης να μπορεί να καταλάβει αν βοηθά στην παραγωγή ενέργειας ή αν καταναλώνει την ήδη υπάρχουσα. \n\n 2. Κατάσταση Φωτοβολταϊκών: \n Ο χρήστης μπορεί να ενημερωθεί για την κατάσταση της μπαταρίας και τη λειτουργία κάθε πανελ ξεχωριστά \n\n 3. Στατιστικά: \n Ο χρήστης μπορεί να ενημερωθεί για τα στατιστικά της ενέργειας που παράχθηκε καθώς και αυτής που καταναλώθηκε από το λεωφορείο και να εξάγει συμπεράσματα ώστε να βελτιώσει την αξιοποίηση των διαθέσιμων πόρων.",
    },
  ],
  robotVacum: [
    {
      id: "quickStartQuide",
      title: "Σύντομες Σημειώσεις Εκκίνησης",
      image: hooverImage,
    },
    {
      id: "shortReferenceManual",
      title: "Εγχειρίδιο Σύντομης Αναφοράς",
      description: "Χάρτης: \n Προβολή κάτοψης του εσωτερικού του λεωφορείου.\n\n Μενού επιλογών: \n Προβάλλει τις διαθέσιμες επιλογές καθαρισμού.\n\n Επιβεβαίωση: \n Οριστικοποιεί τις επιλογές του χρήστη.\n\n Χρονόμετρο: \n Αντίστροφη μέτρηση του χρόνου περάτωσης του καθαρισμού.",
    },
    {
      id: "fullReferenceManual",
      title: "Αναλυτικό Εγχειρίδιο Αναφοράς",
      description: "Αναλυτικές λειτουργίες: \n\n 1.	Επιλογή σημείων καθαρισμού από χάρτη: \n Ο χρήστης έχει τη δυνατότητα να επιλέξει από το χάρτη συγκεκριμένα σημεία καθαρισμού. Οι επιλογές θα είναι προκαθορισμένες με βάση σημεία σε ένα imap που θα αντικατοπτρίζει την κάτοψη του λεωφορείου. Αυτές μπορεί να είναι το δάπεδο, οι σκάλες,  τα καθίσματα, τα τζάμια ή ολόκληρο το λεωφορείο. \n\n 2.	Επιλογή μεθόδου καθαρισμού: \n Αφού ο χρήστης έχει επιλέξει τα σημεία καθαρισμού, η εφαρμογή του δίνει μια λίστα με επιλογές για τον τρόπο καθαρισμού, δηλαδή απλό σκούπισμα, βιολογικός καθαρισμός ή καθαρισμός του εξωτερικού του λεωφορείου. \n\n 3.	Εκτιμώμενος χρόνος και διεκπεραίωση: \n Στο σημείο αυτό υπολογίζεται ο εκτιμώμενος χρόνος διεκπεραίωσης της διαδικασίας και εφόσον ο χρήστης εγκρίνει, ξεκινάει η διαδικασία του καθαρισμού. Διαφορετικά, ο χρήστης υποβάλλει τις αλλαγές που επιθυμεί. \n\n 4.	Αναφορά ευρημάτων: \n Η σκούπα ενημερώνει μέσω της εφαρμογής την εταιρεία για την εύρεση τα οποία αντιλαμβάνεται ως σημαντικά."
    },
  ],
};

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
                <div className="hover-hint">🖱️ Κρατήστε το ποντίκι για μεγέθυνση</div>
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
              Μετακινήστε το ποντίκι έξω για κλείσιμο
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
        <h2 style={{ fontWeight: "bold", margin: 0, marginRight: "auto", lineHeight: "24px" }} >Μενού</h2>
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
          <h2  style={{ fontWeight: "bold"}}>ΠΛΗΡΟΦΟΡΙΕΣ</h2>
          <RightSidebarGuide guides={guidesByMenu[activeMenu]}/>          
      </div>
      </aside>
    </div>
  );
}