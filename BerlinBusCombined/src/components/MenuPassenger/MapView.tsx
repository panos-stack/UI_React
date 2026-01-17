import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { Navigation, Utensils, MapPin, Info, Bus } from "lucide-react";

interface BusStop {
  id: number;
  name: string;
  position: [number, number];
  arrivalTime: string;
}

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  position: [number, number];
  rating: number;
  distance: string;
}

const busStops: BusStop[] = [
  { id: 1, name: "Brandenburg Gate", position: [52.5163, 13.3777], arrivalTime: "10:00 AM" },
  { id: 2, name: "TV Tower", position: [52.5208, 13.4094], arrivalTime: "10:20 AM" },
  { id: 3, name: "Berlin Cathedral", position: [52.5191, 13.4013], arrivalTime: "10:40 AM" },
  { id: 4, name: "Reichstag", position: [52.5186, 13.3762], arrivalTime: "11:00 AM" },
];

const restaurants: Restaurant[] = [
  { id: 1, name: "Berliner Küche", cuisine: "German", position: [52.5170, 13.3800], rating: 4.5, distance: "50m from Brandenburg Gate" },
  { id: 2, name: "Bella Italia", cuisine: "Italian", position: [52.5200, 13.4080], rating: 4.3, distance: "100m from TV Tower" },
  { id: 3, name: "Curry 36", cuisine: "Fast Food", position: [52.5195, 13.4020], rating: 4.7, distance: "80m from Cathedral" },
  { id: 4, name: "Hauptstadt Café", cuisine: "Café", position: [52.5180, 13.3770], rating: 4.6, distance: "70m from Reichstag" },
];

const routePath: [number, number][] = [
  [52.5163, 13.3777], // Brandenburg Gate
  [52.5208, 13.4094], // TV Tower
  [52.5191, 13.4013], // Berlin Cathedral
  [52.5186, 13.3762], // Reichstag
];

export function MapView() {
  const [selectedStop, setSelectedStop] = useState<BusStop | null>(null);
  const [showRestaurants, setShowRestaurants] = useState(true);
  const [showRoute, setShowRoute] = useState(true);
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const polylineRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {preferCanvas: true,}).setView([52.5194, 13.3930], 14);
    mapRef.current = map;

    setTimeout(() => {map.invalidateSize();}, 0);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom icon for bus stops
    const busStopIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: #3B82F6; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    // Custom icon for restaurants
    const restaurantIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: #EF4444; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    // Add bus stop markers
    busStops.forEach((stop) => {
      const marker = L.marker(stop.position, { icon: busStopIcon })
        .addTo(map)
        .bindPopup(`
          <div style="padding: 8px;">
            <h3 style="font-weight: bold; color: #1E40AF; margin-bottom: 4px;">${stop.name}</h3>
            <p style="font-size: 14px; color: #6B7280; margin: 4px 0;">Stop #${stop.id}</p>
            <p style="font-size: 14px; color: #3B82F6; margin: 4px 0;">${stop.arrivalTime}</p>
          </div>
        `);
      
      marker.on('click', () => setSelectedStop(stop));
      markersRef.current.push(marker);
    });

    // Add restaurant markers
    restaurants.forEach((restaurant) => {
      const marker = L.marker(restaurant.position, { icon: restaurantIcon })
        .addTo(map)
        .bindPopup(`
          <div style="padding: 8px;">
            <h3 style="font-weight: bold; color: #111827; margin-bottom: 4px;">${restaurant.name}</h3>
            <p style="font-size: 14px; color: #6B7280; margin: 4px 0;">${restaurant.cuisine}</p>
            <p style="font-size: 14px; color: #EAB308; margin: 4px 0;">⭐ ${restaurant.rating}</p>
            <p style="font-size: 12px; color: #9CA3AF; margin: 4px 0;">${restaurant.distance}</p>
          </div>
        `);
      markersRef.current.push(marker);
    });

    // Add route polyline
    const polyline = L.polyline(routePath, {
      color: '#3B82F6',
      weight: 4,
      opacity: 0.7,
      dashArray: '10, 10',
    }).addTo(map);
    polylineRef.current = polyline;

    // Cleanup
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update restaurant markers visibility
  useEffect(() => {
    if (!mapRef.current) return;
    
    markersRef.current.forEach((marker, index) => {
      // First 4 markers are bus stops, rest are restaurants
      if (index >= busStops.length) {
        if (showRestaurants) {
          marker.addTo(mapRef.current!);
        } else {
          marker.remove();
        }
      }
    });
  }, [showRestaurants]);

  // Update route visibility
  useEffect(() => {
    if (!mapRef.current || !polylineRef.current) return;
    
    if (showRoute) {
      polylineRef.current.addTo(mapRef.current);
    } else {
      polylineRef.current.remove();
    }
  }, [showRoute]);

  return (
    <div className="lego-berlin-map-view">
      <div className="lego-berlin-map-header">
        <h2>Interactive Map</h2>
        <p>Explore stops, restaurants, and navigation routes</p>
      </div>

      <div className="lego-flex">
        {/* Sidebar */}
        <div className="lego-berlin-map-sidebar">
          <div>
            {/* Controls */}
            <div>
              <h3 className="lego-berlin-map-controls-title">Map Controls</h3>
              <div>
                <label className="lego-berlin-map-control-item">
                  <input
                    type="checkbox"
                    checked={showRestaurants}
                    onChange={(e) => setShowRestaurants(e.target.checked)}
                  />
                  <Utensils className="lego-w-5 lego-h-5 lego-text-red-600" />
                  <span>Show Restaurants</span>
                </label>
                
                <label className="lego-berlin-map-control-item">
                  <input
                    type="checkbox"
                    checked={showRoute}
                    onChange={(e) => setShowRoute(e.target.checked)}
                  />
                  <Bus className="lego-w-5 lego-h-5 lego-text-blue-600" />
                  <span>Show Bus Route</span>
                </label>
              </div>
            </div>

            {/* Bus Stops */}
            <div>
              <h3 className="lego-berlin-map-section-title">
                <MapPin className="lego-w-5 lego-h-5 lego-text-blue-600" />
                Bus Stops
              </h3>
              <div className="lego-berlin-map-stops-list">
                {busStops.map((stop) => (
                  <button
                    key={stop.id}
                    onClick={() => setSelectedStop(stop)}
                    className={`lego-berlin-map-stop-item ${
                      selectedStop?.id === stop.id
                        ? "lego-berlin-map-stop-selected"
                        : "lego-berlin-map-stop-default"
                    }`}
                  >
                    <div>
                      <div>
                        <h4 className="lego-berlin-map-stop-name">{stop.name}</h4>
                        <p className="lego-berlin-map-stop-number">Stop #{stop.id}</p>
                      </div>
                      <span className="lego-berlin-map-stop-time">
                        {stop.arrivalTime}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Nearby Restaurants */}
            <div>
              <h3 className="lego-berlin-map-section-title">
                <Utensils className="lego-w-5 lego-h-5 lego-text-red-600" />
                Nearby Restaurants
              </h3>
              <div className="lego-berlin-map-restaurants-list">
                {restaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="lego-berlin-map-restaurant-item"
                  >
                    <h4 className="lego-berlin-map-restaurant-name">{restaurant.name}</h4>
                    <p className="lego-berlin-map-restaurant-cuisine">{restaurant.cuisine}</p>
                    <div className="lego-berlin-map-restaurant-meta">
                      <span className="lego-berlin-map-restaurant-rating">
                        ⭐ {restaurant.rating}
                      </span>
                      <span className="lego-berlin-map-restaurant-distance">{restaurant.distance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="lego-berlin-map-container">
          <div
            ref={mapContainerRef}
            style={{ height: "100%", width: "100%" }}
            className="lego-berlin-map-canvas"
          ></div>

          {/* Legend */}
          <div className="lego-berlin-map-legend">
            <h4 className="lego-berlin-map-legend-title">
              <Info className="lego-w-4 lego-h-4" />
              Legend
            </h4>
            <div className="lego-berlin-map-legend-items">
              <div className="lego-berlin-map-legend-item">
                <div className="lego-berlin-map-legend-marker lego-bg-blue-600"></div>
                <span>Bus Stops</span>
              </div>
              <div className="lego-berlin-map-legend-item">
                <div className="lego-berlin-map-legend-marker lego-bg-red-600"></div>
                <span>Restaurants</span>
              </div>
              <div className="lego-berlin-map-legend-item">
                <div className="lego-berlin-map-legend-route" style={{ borderTop: "3px dashed #3B82F6" }}></div>
                <span>Bus Route</span>
              </div>
            </div>
          </div>

          {/* Selected Stop Info */}
          {selectedStop && (
            <div className="lego-berlin-map-stop-detail">
              <div>
                <h3 className="lego-berlin-map-stop-detail-name">{selectedStop.name}</h3>
                <button
                  onClick={() => setSelectedStop(null)}
                  className="lego-berlin-map-stop-close"
                >
                  ✕
                </button>
              </div>
              <p className="lego-berlin-map-stop-detail-info">Stop #{selectedStop.id} on the tour route</p>
              <div className="lego-berlin-map-stop-detail-arrival">
                <Navigation className="lego-w-4 lego-h-4" />
                <span>Arrival: {selectedStop.arrivalTime}</span>
              </div>
              <button className="lego-berlin-map-stop-directions">
                <Navigation className="lego-w-4 lego-h-4" />
                Get Directions Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}