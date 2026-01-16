import { useState } from "react";
import { MapPin, Clock, Users } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

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
    image: "https://images.unsplash.com/photo-1640603799331-15e3d8b14ada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCcmFuZGVuYnVyZyUyMEdhdGUlMjBCZXJsaW58ZW58MXx8fHwxNzY4MTQwNzk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "The Brandenburg Gate is an 18th-century neoclassical monument, built on the orders of Prussian king Frederick William II. It's one of the most iconic landmarks in Germany and a symbol of German reunification.",
    yearBuilt: "1791",
    visitorsPerYear: "10 million+",
    funFact: "The gate was once part of a wall that divided Berlin during the Cold War.",
    location: "Pariser Platz, 10117 Berlin"
  },
  {
    id: 2,
    name: "Berlin TV Tower",
    image: "https://images.unsplash.com/photo-1560930950-5cc20e80e392?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCZXJsaW4lMjBUViUyMFRvd2VyfGVufDF8fHx8MTc2ODE0MDc5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Standing at 368 meters tall, the Fernsehturm (TV Tower) is the tallest structure in Germany. It offers panoramic views of Berlin from its observation deck and rotating restaurant.",
    yearBuilt: "1969",
    visitorsPerYear: "1.2 million",
    funFact: "On sunny days, sunlight creates a cross reflection on the tower's sphere, nicknamed 'Pope's Revenge' by Berliners.",
    location: "Panoramastraße 1A, 10178 Berlin"
  },
  {
    id: 3,
    name: "Berlin Cathedral",
    image: "https://images.unsplash.com/photo-1569404225992-9ac478f3c14e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCZXJsaW4lMjBDYXRoZWRyYWx8ZW58MXx8fHwxNzY4MTQwNzk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "The Berlin Cathedral (Berliner Dom) is a magnificent Baroque-style Protestant cathedral located on Museum Island. Its stunning dome and ornate interior make it one of Berlin's most beautiful buildings.",
    yearBuilt: "1905",
    visitorsPerYear: "800,000",
    funFact: "The cathedral's dome walkway offers one of the best views of central Berlin, accessible by climbing 270 steps.",
    location: "Am Lustgarten, 10178 Berlin"
  },
  {
    id: 4,
    name: "Reichstag Building",
    image: "https://images.unsplash.com/photo-1564613655657-7f7a7df91177?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSZWljaHN0YWclMjBCZXJsaW58ZW58MXx8fHwxNzY4MTQwNzk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
    <div className="berlin-sights-view h-full flex bg-gray-50">
      {/* Sight Selection Panel */}
      <div className="berlin-sights-sidebar w-96 bg-white border-r overflow-y-auto">
        <div className="berlin-sights-sidebar-header p-6 border-b bg-gradient-to-r from-blue-600 to-blue-700">
          <h2 className="text-2xl font-bold text-white">Historical Sights</h2>
          <p className="text-blue-100 text-sm mt-1">
            Explore Berlin's landmarks
          </p>
        </div>
        
        <div className="berlin-sights-list p-4">
          {sights.map((sight) => (
            <button
              key={sight.id}
              onClick={() => setSelectedSight(sight)}
              className={`berlin-sight-thumbnail w-full mb-3 rounded-xl overflow-hidden transition-all ${
                selectedSight.id === sight.id
                  ? "berlin-sight-thumbnail-selected ring-4 ring-blue-500 shadow-lg scale-[1.02]"
                  : "berlin-sight-thumbnail-default hover:shadow-md hover:scale-[1.01]"
              }`}
            >
              <div className="aspect-video relative">
                <ImageWithFallback
                  src={sight.image}
                  alt={sight.name}
                  className="w-full h-full object-cover"
                />
                {selectedSight.id === sight.id && (
                  <div className="berlin-sight-overlay absolute inset-0 bg-blue-600/20"></div>
                )}
              </div>
              <div className="berlin-sight-thumbnail-info p-4 text-left bg-white">
                <h3 className="font-semibold text-gray-900">{sight.name}</h3>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Berlin Landmark
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      <div className="berlin-sights-content flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          <div className="berlin-sight-detail bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="berlin-sight-hero aspect-[16/9] relative">
              <ImageWithFallback
                src={selectedSight.image}
                alt={selectedSight.name}
                className="w-full h-full object-cover"
              />
              <div className="berlin-sight-hero-gradient absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="berlin-sight-hero-text absolute bottom-0 left-0 right-0 p-8 text-white">
                <h1 className="text-4xl font-bold mb-2">{selectedSight.name}</h1>
                <p className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-4 h-4" />
                  {selectedSight.location}
                </p>
              </div>
            </div>

            <div className="berlin-sight-info p-8">
              <p className="berlin-sight-description text-lg text-gray-700 leading-relaxed mb-8">
                {selectedSight.description}
              </p>

              <div className="berlin-sight-stats grid grid-cols-3 gap-6 mb-8">
                <div className="berlin-sight-stat bg-blue-50 rounded-xl p-6 text-center">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="berlin-sight-stat-label text-sm font-medium text-gray-600 mb-1">Year Built</h3>
                  <p className="berlin-sight-stat-value text-2xl font-bold text-gray-900">{selectedSight.yearBuilt}</p>
                </div>

                <div className="berlin-sight-stat bg-green-50 rounded-xl p-6 text-center">
                  <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h3 className="berlin-sight-stat-label text-sm font-medium text-gray-600 mb-1">Annual Visitors</h3>
                  <p className="berlin-sight-stat-value text-2xl font-bold text-gray-900">{selectedSight.visitorsPerYear}</p>
                </div>

                <div className="berlin-sight-stat bg-purple-50 rounded-xl p-6 text-center">
                  <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="berlin-sight-stat-label text-sm font-medium text-gray-600 mb-1">Stop #{selectedSight.id}</h3>
                  <p className="berlin-sight-stat-value text-xl font-bold text-gray-900">Tour Route</p>
                </div>
              </div>

              <div className="berlin-sight-fun-fact bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-r-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-xl">💡</span> Fun Fact
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedSight.funFact}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}