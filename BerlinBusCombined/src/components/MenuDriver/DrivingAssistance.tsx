import { useState } from "react";

function AlertTriangleIcon() {
  return (
    <svg
      className="bus-alert-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  );
}

function CoffeeIcon() {
  return (
    <svg
      className="bus-alert-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
      <line x1="6" y1="1" x2="6" y2="4"></line>
      <line x1="10" y1="1" x2="10" y2="4"></line>
      <line x1="14" y1="1" x2="14" y2="4"></line>
    </svg>
  );
}

function DoorOpenIcon() {
  return (
    <svg
      className="bus-alert-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        ry="2"
      ></rect>
      <line x1="9" y1="3" x2="9" y2="21"></line>
      <circle cx="16" cy="12" r="1"></circle>
    </svg>
  );
}

function NavigationIcon() {
  return (
    <svg
      className="bus-alert-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
    </svg>
  );
}

export function DrivingAssistance() {
  const [speed, setSpeed] = useState(65);
  const [speedLimit] = useState(60);
  const [laneDeviation, setLaneDeviation] = useState(false);
  const [driverTired, setDriverTired] = useState(false);
  const [passengersExiting, setPassengersExiting] =
    useState(false);

  return (
    <div>
      <div className="bus-card">
        <h2>Βοήθεια στην Οδήγηση</h2>
        <p className="bus-card-description">
          Οι αισθητήρες του λεωφορείου παρακολουθούν την οδήγηση
          και βοηθούν τον οδηγό.
        </p>

        {/* Status Overview */}
        <div className="bus-grid bus-grid-cols-2 bus-mb-6">
          <div className="bus-stat-card">
            <div className="bus-flex bus-items-center bus-justify-between">
              <span>Ταχύτητα</span>
              <span
                className={`bus-badge ${speed > speedLimit ? "bus-badge-destructive" : "bus-badge-default"}`}
              >
                {speed} km/h
              </span>
            </div>
            <div className="bus-text-sm bus-text-muted bus-mt-2">
              Όριο: {speedLimit} km/h
            </div>
          </div>

          <div className="bus-stat-card">
            <div className="bus-flex bus-items-center bus-justify-between">
              <span>Κατάσταση Λωρίδας</span>
              <span
                className={`bus-badge ${laneDeviation ? "bus-badge-destructive" : "bus-badge-default"}`}
              >
                {laneDeviation ? "Απόκλιση" : "Εντάξει"}
              </span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="bus-space-y-4">
          {speed > speedLimit && (
            <div className="bus-alert bus-alert-destructive">
              <AlertTriangleIcon />
              <div className="bus-alert-content">
                <div className="bus-alert-title">
                  Υπέρβαση Ορίου Ταχύτητας
                </div>
                <div className="bus-alert-description">
                  Μειώστε την ταχύτητα! Τρέχουσα: {speed} km/h,
                  Όριο: {speedLimit} km/h
                </div>
              </div>
            </div>
          )}

          {laneDeviation && (
            <div className="bus-alert bus-alert-destructive">
              <NavigationIcon />
              <div className="bus-alert-content">
                <div className="bus-alert-title">
                  Απόκλιση από τη Λωρίδα
                </div>
                <div className="bus-alert-description">
                  Επιστρέψτε στη λωρίδα σας!
                </div>
              </div>
            </div>
          )}

          {driverTired && (
            <div className="bus-alert bus-alert-default">
              <CoffeeIcon />
              <div className="bus-alert-content">
                <div className="bus-alert-title">
                  Ενδείξεις Κόπωσης
                </div>
                <div className="bus-alert-description">
                  Σκεφτείτε μήπως θέλετε καφέ
                </div>
              </div>
            </div>
          )}

          {passengersExiting && (
            <div className="bus-alert bus-alert-default">
              <DoorOpenIcon />
              <div className="bus-alert-content">
                <div className="bus-alert-title">Προσοχή</div>
                <div className="bus-alert-description">
                  Επιβάτες κατεβαίνουν ακόμα. Μην κλείσετε τις
                  πόρτες!
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Demo Controls */}
        <div className="bus-mt-8 bus-pt-6 bus-border-t">
          <p className="bus-text-sm bus-text-muted bus-mb-4">
            Έλεγχοι Demo:
          </p>
          <div className="bus-demo-controls">
            <button
              onClick={() =>
                setSpeed(speed > speedLimit ? 55 : 75)
              }
              className="bus-btn bus-btn-secondary"
            >
              Αλλαγή Ταχύτητας
            </button>
            <button
              onClick={() => setLaneDeviation(!laneDeviation)}
              className="bus-btn bus-btn-secondary"
            >
              Απόκλιση Λωρίδας
            </button>
            <button
              onClick={() => setDriverTired(!driverTired)}
              className="bus-btn bus-btn-secondary"
            >
              Κόπωση Οδηγού
            </button>
            <button
              onClick={() =>
                setPassengersExiting(!passengersExiting)
              }
              className="bus-btn bus-btn-secondary"
            >
              Επιβάτες Εξόδου
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}