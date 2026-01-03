import { useState } from 'react';
import { ArrowLeft, Info} from 'lucide-react';
import './stylesPassenger.css';
import coffeeImage from './images/Coffee_Quick_Start_Guide.png';

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
  { id: 'view', label: 'Θέα', component: null },
  { id: 'sights', label: 'Αξιοθέατα', component: null },
  { id: 'coffeeOrdering', label: 'Παραγγελία Καφέ', component: null },
  { id: 'tour', label: 'Τουριστική Πλοήγηση', component: null }
]

const guidesByMenu: Record<string, GuideItem[]> = {
  home: [
    {
      id: "noInfo",
      description: "Δεν υπάρχουν διαθέσιμες πληροφορίες. Επιλέξτε κάποια ενέργεια από το μενού για να ξεκινήσετε."
    }
  ],
  view: [
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
  sights: [
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
  coffeeOrdering: [
    {
      id: "quickStartQuide",
      title: "Σύντομες Σημειώσεις Εκκίνησης",
      image: coffeeImage,
    },
    {
      id: "shortReferenceManual",
      title: "Εγχειρίδιο Σύντομης Αναφοράς",
      description: "Λίστα Μαγαζιών: \n Επιλέγουμε από πιο μαγαζί θέλουμε να προμυθευτούμε το προϊόν. \n\n Κατάλογος: \n Επιλέγουμε ποιο προϊόν θα αγοράσουμε. \n\n Λίστα στάσεων: Επιλέγουμε σε ποια στάση θα παραλάβουμε τα προϊόντα. \n\n Κουμπί Πληρωμής: \n Επιλέγουμε τον τρόπο που θα πληρώσουμε. \n\n Πεδία για την Κάρτα: Σημειώνουμε τα στοιχεία της κάρτας μας. \n\n Κουμπί Επιβεβαίωσης: \n Κάνουμε την οριστική πληρωμή και αυτόματα ολοκληρώνεται η παραγγελία. \n\n ",
    },
    {
      id: "fullReferenceManual",
      title: "Αναλυτικό Εγχειρίδιο Αναφοράς",
      description: "Αναλυτικές Λειτουργίες: \n\n 1. Επιλογή καφετέριας: \n Ο χρήστης θα μπορεί να επιλέξει μέσω ενός χάρτη ένα κατάστημα με βάση την προτίμηση του και τις προσφορές που μπορεί να υπάρχουν με τη χρήση του ανάλογου κουμπιού. \n\n 2. Επιλογή προϊόντων: \n Αφότου ο χρήστης έχει επιλέξει την επιθυμητή καφετέρια, μπορεί πλέον να επιλέξει και τα προϊόντα που επιθυμεί μέσω του καταλόγου που θα εμφανίζεται. Επιλέγωντας προσωρινά τα προϊόντα εμφανίζεται ο εκτιμώμενος χρόνος για παρασκευή και παραλαβή. Αν ο χρήστης συμφωνεί τότε οριστικοποιεί τις επιλογές του με τη χρήση του ανάλογου κουμπιού. \n\n 3.	Επιλογή στάσης: \n Στο σημείο αυτό εμφανίζεται στο χρήστη ο χάρτης με τις διαθέσιμες στάσεις με βάση τον εκτιμώμενο χρόνο παραλαβής και τη διαδρομή του λεωφορείου. Με τη χρήση ενός κουμπιού οριστικοποίησης, ο χρήστης επιλέγει τη στάση παραλαβής των προϊόντων του. \n\n 4.	Ολοκλήρωση παραγγελίας: \n Σε αυτό το στάδιο της εφαρμογής, ο χρήστης οδηγείται σε μια σελίδα στην οποία προβάλλονται οι επιλογές του, τις οποίες επιβεβαιώνει με τη χρήση των ανάλογων κουμπιών. Οδηγείται σε μια ξεχωριστή ιστοσελίδα που επιλέγει το τύπο πληρωμής, καταγράφει τα στοιχεία πληρωμής και όταν αυτά εγκριθούν παραλαμβάνει την ηλεκτρονική απόδειξη. Τέλος, εμφανίζεται το αντίστοιχο χρονόμετρο με τον εκτιμώμενο χρόνο παραλαβής."
    },
  ],
  tour: [
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

interface MenuPassengerAppProps {
  onBack: () => void;
}

export function MenuPassengerApp({ onBack }: MenuPassengerAppProps) {
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
          {guidesByMenu[activeMenu] ? (
            <RightSidebarGuide guides={guidesByMenu[activeMenu]}/>
          ) : (
            <p>Δεν υπάρχουν διαθέσιμες πληροφορίες.</p>
          )}

          
      </div>
      </aside>
    </div>
  );
}