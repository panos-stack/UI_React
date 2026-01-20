import { forwardRef, useImperativeHandle, useEffect, useRef } from "react";
import L, { icon, map } from "leaflet";
import "leaflet/dist/leaflet.css";
import { BusStop } from "./Coffee/types";
import { Restaurant } from "./Coffee/types";
import markerBlue from "./images/marker-icon-blue.png";
import markerRed from "./images/red_icon.png";
import shadow from "./images/marker-shadow.png";

const redIcon = new L.Icon({
  iconUrl: markerRed,
  shadowUrl: shadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
  iconUrl: markerBlue,
  shadowUrl: shadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export interface LeafletMapHandle {
  showRestaurants: (show: boolean) => void;
  showRoute: (show: boolean) => void;
}

type Props = {
  busStops: BusStop[];
  restaurants?: Restaurant[];
  routePath?: [number, number][];
  selectedStop: BusStop | null;
  selectedRestaurant?: Restaurant | null;
  showRestaurants?: boolean;
  showRoute?: boolean;
  onSelectStop: (stop: BusStop) => void;
};

export const LeafletMap = forwardRef<LeafletMapHandle, Props>(
  ({ busStops, restaurants = [], routePath, selectedStop, selectedRestaurant, showRestaurants = true, showRoute = true, onSelectStop }, ref) => {
    const mapRef = useRef<L.Map | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const restaurantMarkers = useRef<L.Marker[]>([]);
    const routeRef = useRef<L.Polyline | null>(null);

    // Expose imperative methods to parent
    useImperativeHandle(ref, () => ({
      showRestaurants(show: boolean) {
        if (!mapRef.current) return;
        restaurantMarkers.current.forEach(m =>
          show ? m.addTo(mapRef.current!) : m.remove()
        );
      },
      showRoute(show: boolean) {
        if (!mapRef.current || !routeRef.current) return;
        show ? routeRef.current.addTo(mapRef.current) : routeRef.current.remove();
      },
    }));

    // Initialize the map
    useEffect(() => {
      if (!containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current).setView([52.5194, 13.393], 14);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

      // Add bus stop markers
      busStops.forEach(stop => {
        const m = L.marker(stop.position, {icon: blueIcon}).addTo(map);
        m.on("click", () => onSelectStop(stop));
      });

      // Add restaurant markers (conditionally)
      restaurants.forEach(r => {
        const m = L.marker(r.position, {icon: redIcon});
        if (showRestaurants) m.addTo(map);
        restaurantMarkers.current.push(m);
      });

      // Add route (conditionally)
      if (routePath) {
        routeRef.current = L.polyline(routePath, { dashArray: "10,10" });
        if (showRoute) routeRef.current.addTo(map);
      }

      // Fix map display in flex/grid containers
      setTimeout(() => map.invalidateSize(), 0);
    }, [busStops, restaurants, routePath, onSelectStop, showRestaurants, showRoute]);

    // Fly to selected stop or restaurant
    useEffect(() => {
      if (!mapRef.current) return;

      if (selectedStop) {
        mapRef.current.flyTo(selectedStop.position, 16);
      } else if (selectedRestaurant) {
        mapRef.current.flyTo(selectedRestaurant.position, 16);
      }
    }, [selectedStop, selectedRestaurant]);


    return <div ref={containerRef} className="w-full h-full" />;
  }
);