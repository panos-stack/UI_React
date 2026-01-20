import { useState, useEffect, useRef } from "react";
import { Navigation, Utensils, MapPin, Info, Bus } from "lucide-react";
import { BusStop, Restaurant } from "./Coffee/types";
import { busStops, restaurants } from "./Coffee/data/mockData";
import { LeafletMap, LeafletMapHandle } from "./LeafletMap";

const routePath: [number, number][] = [
  [52.5163, 13.3777], // Brandenburg Gate
  [52.5208, 13.4094], // TV Tower
  [52.5191, 13.4013], // Berlin Cathedral
  [52.5186, 13.3762], // Reichstag
];

export function MapView() {
  const mapRef = useRef<LeafletMapHandle | null>(null);

  const [selectedStop, setSelectedStop] = useState<BusStop | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showRestaurants, setShowRestaurants] = useState(true);
  const [showRoute, setShowRoute] = useState(true);

  useEffect(() => {
    mapRef.current?.showRestaurants(showRestaurants);
  }, [showRestaurants]);

  useEffect(() => {
    mapRef.current?.showRoute(showRoute);
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
                    onClick={() => {setSelectedStop(stop); setSelectedRestaurant(null)}}
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
                      <span className="lego-berlin-map-stop-time">{stop.arrivalTime}</span>
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
                    <button
                    key={restaurant.id}
                    onClick={() => {setSelectedRestaurant(restaurant); setSelectedStop(null);}}
                    className={`lego-berlin-map-stop-item ${
                      selectedRestaurant?.id === restaurant.id
                        ? "lego-berlin-map-stop-selected"
                        : "lego-berlin-map-stop-default"
                    }`}
                  >
                    <div>
                      <div>
                      <h4 className="lego-berlin-map-restaurant-name">{restaurant.name} ({restaurant.cuisine})</h4>
                      <p className="lego-berlin-map-restaurant-cuisine">{restaurant.distance}</p>
                      </div>
                      <span className="lego-berlin-map-restaurant-rating">⭐ {restaurant.rating}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="lego-berlin-map-container">
          <LeafletMap
            ref={mapRef}
            busStops={busStops}
            restaurants={restaurants}
            routePath={routePath}
            selectedStop={selectedStop}
            selectedRestaurant={selectedRestaurant}
            showRestaurants={showRestaurants}
            showRoute={showRoute}
            onSelectStop={(stop) => setSelectedStop(stop)}
          />

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
                <div
                  className="lego-berlin-map-legend-route"
                  style={{ borderTop: "3px dashed #3B82F6" }}
                ></div>
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
              <p className="lego-berlin-map-stop-detail-info">
                Stop #{selectedStop.id} on the tour route
              </p>
              <div className="lego-berlin-map-stop-detail-arrival">
                <Navigation className="lego-w-4 lego-h-4" />
                <span>Arrival: {selectedStop.arrivalTime}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
