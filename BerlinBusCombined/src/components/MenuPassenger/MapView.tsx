import { useState, useEffect, useRef } from "react";
import L from "leaflet";
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

    // Initialize map
    const map = L.map(mapContainerRef.current).setView([52.5194, 13.3930], 14);
    mapRef.current = map;

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
    <div className="berlin-map-view h-full flex flex-col bg-gray-50">
      <div className="berlin-map-header bg-white border-b px-8 py-6">
        <h2 className="text-3xl font-bold text-gray-900">Interactive Map</h2>
        <p className="text-gray-600 mt-2">
          Explore stops, restaurants, and navigation routes
        </p>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="berlin-map-sidebar w-96 bg-white border-r overflow-y-auto">
          <div className="p-6">
            {/* Controls */}
            <div className="mb-6">
              <h3 className="berlin-map-controls-title font-semibold text-gray-900 mb-3">Map Controls</h3>
              <div className="space-y-2">
                <label className="berlin-map-control-item flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <input
                    type="checkbox"
                    checked={showRestaurants}
                    onChange={(e) => setShowRestaurants(e.target.checked)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Utensils className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium">Show Restaurants</span>
                </label>
                
                <label className="berlin-map-control-item flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <input
                    type="checkbox"
                    checked={showRoute}
                    onChange={(e) => setShowRoute(e.target.checked)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Bus className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Show Bus Route</span>
                </label>
              </div>
            </div>

            {/* Bus Stops */}
            <div className="mb-6">
              <h3 className="berlin-map-section-title font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Bus Stops
              </h3>
              <div className="berlin-map-stops-list space-y-2">
                {busStops.map((stop) => (
                  <button
                    key={stop.id}
                    onClick={() => setSelectedStop(stop)}
                    className={`berlin-map-stop-item w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedStop?.id === stop.id
                        ? "berlin-map-stop-selected border-blue-500 bg-blue-50"
                        : "berlin-map-stop-default border-gray-200 hover:border-blue-300 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="berlin-map-stop-name font-medium text-gray-900">{stop.name}</h4>
                        <p className="berlin-map-stop-number text-sm text-gray-500 mt-1">Stop #{stop.id}</p>
                      </div>
                      <span className="berlin-map-stop-time text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {stop.arrivalTime}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Nearby Restaurants */}
            <div>
              <h3 className="berlin-map-section-title font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-red-600" />
                Nearby Restaurants
              </h3>
              <div className="berlin-map-restaurants-list space-y-3">
                {restaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="berlin-map-restaurant-item p-4 bg-white border border-gray-200 rounded-lg"
                  >
                    <h4 className="berlin-map-restaurant-name font-medium text-gray-900">{restaurant.name}</h4>
                    <p className="berlin-map-restaurant-cuisine text-sm text-gray-500 mt-1">{restaurant.cuisine}</p>
                    <div className="berlin-map-restaurant-meta flex items-center justify-between mt-2">
                      <span className="berlin-map-restaurant-rating text-sm text-yellow-600 font-medium">
                        ⭐ {restaurant.rating}
                      </span>
                      <span className="berlin-map-restaurant-distance text-xs text-gray-500">{restaurant.distance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="berlin-map-container flex-1 relative">
          <div
            ref={mapContainerRef}
            style={{ height: "100%", width: "100%" }}
            className="berlin-map-canvas z-0"
          ></div>

          {/* Legend */}
          <div className="berlin-map-legend absolute bottom-6 right-6 bg-white rounded-xl shadow-lg p-4 z-[1000]">
            <h4 className="berlin-map-legend-title font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Legend
            </h4>
            <div className="berlin-map-legend-items space-y-2 text-sm">
              <div className="berlin-map-legend-item flex items-center gap-2">
                <div className="berlin-map-legend-marker w-4 h-4 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Bus Stops</span>
              </div>
              <div className="berlin-map-legend-item flex items-center gap-2">
                <div className="berlin-map-legend-marker w-4 h-4 bg-red-600 rounded-full"></div>
                <span className="text-gray-700">Restaurants</span>
              </div>
              <div className="berlin-map-legend-item flex items-center gap-2">
                <div className="berlin-map-legend-route w-8 h-0.5 bg-blue-600" style={{ borderTop: "3px dashed #3B82F6" }}></div>
                <span className="text-gray-700">Bus Route</span>
              </div>
            </div>
          </div>

          {/* Selected Stop Info */}
          {selectedStop && (
            <div className="berlin-map-stop-detail absolute top-6 left-6 bg-white rounded-xl shadow-lg p-6 z-[1000] max-w-sm">
              <div className="flex items-start justify-between mb-3">
                <h3 className="berlin-map-stop-detail-name font-bold text-xl text-gray-900">{selectedStop.name}</h3>
                <button
                  onClick={() => setSelectedStop(null)}
                  className="berlin-map-stop-close text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <p className="berlin-map-stop-detail-info text-sm text-gray-600 mb-3">Stop #{selectedStop.id} on the tour route</p>
              <div className="berlin-map-stop-detail-arrival flex items-center gap-2 text-blue-600 mb-4">
                <Navigation className="w-4 h-4" />
                <span className="text-sm font-medium">Arrival: {selectedStop.arrivalTime}</span>
              </div>
              <button className="berlin-map-stop-directions w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Navigation className="w-4 h-4" />
                Get Directions Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}