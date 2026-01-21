import { useState } from "react";
import { MapPin, Clock, Users } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import Cathedral from "./images/berlin_cathedral.jpg";
import Tower from "./images/berlin_tower.jpg";
import Gate from "./images/brandenburg_gate.jpg";
import Reichtag from "./images/reichstag.jpg";


interface Sight {
  id: number;
  name: string;
  image: string;
  description: string;
  yearBuilt: string;
  visitorsPerYear: string;
  funFact: string;
  location: string;
}

const sights: Sight[] = [
  {
    id: 1,
    name: "Brandenburg Gate",
    image: Gate,
    description: "The Brandenburg Gate is an 18th-century neoclassical monument, built on the orders of Prussian king Frederick William II. It's one of the most iconic landmarks in Germany and a symbol of German reunification.",
    yearBuilt: "1791",
    visitorsPerYear: "10 million+",
    funFact: "The gate was once part of a wall that divided Berlin during the Cold War.",
    location: "Pariser Platz, 10117 Berlin"
  },
  {
    id: 2,
    name: "Berlin TV Tower",
    image: Tower,
    description: "Standing at 368 meters tall, the Fernsehturm (TV Tower) is the tallest structure in Germany. It offers panoramic views of Berlin from its observation deck and rotating restaurant.",
    yearBuilt: "1969",
    visitorsPerYear: "1.2 million",
    funFact: "On sunny days, sunlight creates a cross reflection on the tower's sphere, nicknamed 'Pope's Revenge' by Berliners.",
    location: "Panoramastraße 1A, 10178 Berlin"
  },
  {
    id: 3,
    name: "Berlin Cathedral",
    image: Cathedral,
    description: "The Berlin Cathedral (Berliner Dom) is a magnificent Baroque-style Protestant cathedral located on Museum Island. Its stunning dome and ornate interior make it one of Berlin's most beautiful buildings.",
    yearBuilt: "1905",
    visitorsPerYear: "800,000",
    funFact: "The cathedral's dome walkway offers one of the best views of central Berlin, accessible by climbing 270 steps.",
    location: "Am Lustgarten, 10178 Berlin"
  },
  {
    id: 4,
    name: "Reichstag Building",
    image: Reichtag,
    description: "The Reichstag is the historic seat of the German parliament (Bundestag). Its modern glass dome, designed by Norman Foster, symbolizes transparency in government and offers spectacular city views.",
    yearBuilt: "1894 (Dome rebuilt 1999)",
    visitorsPerYear: "3 million",
    funFact: "The words 'Dem Deutschen Volke' (To the German People) were added to the building in 1916 using melted-down French cannons from the Napoleonic Wars.",
    location: "Platz der Republik 1, 11011 Berlin"
  }
];

export function HistoricalSights() {
  const [selectedSight, setSelectedSight] = useState<Sight>(sights[0]);

  return (
    <div className="lego-berlin-sights-view">
      {/* Sight Selection Panel */}
      <div className="lego-berlin-sights-sidebar">
        <div className="lego-berlin-sights-sidebar-header">
          <h2>Historical Sights</h2>
          <p>Explore Berlin's landmarks</p>
        </div>
        
        <div className="lego-berlin-sights-list">
          {sights.map((sight) => (
            <button
              key={sight.id}
              onClick={() => setSelectedSight(sight)}
              className={`lego-berlin-sight-thumbnail ${
                selectedSight.id === sight.id
                  ? "lego-berlin-sight-thumbnail-selected"
                  : "lego-berlin-sight-thumbnail-default"
              }`}
            >
              <div className="lego-aspect-video">
                <ImageWithFallback
                  src={sight.image}
                  alt={sight.name}
                />
                {selectedSight.id === sight.id && (
                  <div className="lego-berlin-sight-overlay"></div>
                )}
              </div>
              <div className="lego-berlin-sight-thumbnail-info">
                <h3>{sight.name}</h3>
                <p>
                  <MapPin className="lego-w-3 lego-h-3" />
                  Berlin Landmark
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      <div className="lego-berlin-sights-content">
        <div>
          <div className="lego-berlin-sight-detail">
            <div className="lego-berlin-sight-hero">
              <ImageWithFallback
                src={selectedSight.image}
                alt={selectedSight.name}
              />
              <div className="lego-berlin-sight-hero-gradient"></div>
              <div className="lego-berlin-sight-hero-text">
                <h1>{selectedSight.name}</h1>
                <p>
                  <MapPin className="lego-w-4 lego-h-4" />
                  {selectedSight.location}
                </p>
              </div>
            </div>

            <div className="lego-berlin-sight-info">
              <p className="lego-berlin-sight-description">
                {selectedSight.description}
              </p>

              <div className="lego-berlin-sight-stats">
                <div className="lego-berlin-sight-stat lego-bg-blue-50">
                  <Clock className="lego-w-8 lego-h-8 lego-text-blue-600" />
                  <h3 className="lego-berlin-sight-stat-label">Year Built</h3>
                  <p className="lego-berlin-sight-stat-value lego-text-2xl">{selectedSight.yearBuilt}</p>
                </div>

                <div className="lego-berlin-sight-stat lego-bg-green-50">
                  <Users className="lego-w-8 lego-h-8 lego-text-green-600" />
                  <h3 className="lego-berlin-sight-stat-label">Annual Visitors</h3>
                  <p className="lego-berlin-sight-stat-value lego-text-2xl">{selectedSight.visitorsPerYear}</p>
                </div>

                <div className="lego-berlin-sight-stat lego-bg-purple-50">
                  <MapPin className="lego-w-8 lego-h-8 lego-text-purple-600" />
                  <h3 className="lego-berlin-sight-stat-label">Stop #{selectedSight.id}</h3>
                  <p className="lego-berlin-sight-stat-value lego-text-xl">Tour Route</p>
                </div>
              </div>

              <div className="lego-berlin-sight-fun-fact">
                <h3>
                  <span>💡</span> Fun Fact
                </h3>
                <p>
                  {selectedSight.funFact}
                </p>
              </div>

              <div style={{padding: 10, textAlign: "center"}}>
                <span > For additional information about the {selectedSight.name}'s location proceed to "Navigation for Tourists" tab on the left. </span>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}