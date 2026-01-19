import { useEffect, useState } from "react";
import { Play, Pause, Camera } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import Roadrview from "./images/road_view.jpg";
import { busStops } from "./Coffee/data/mockData";

export function DriverView() {
  const [isPlaying, setIsPlaying] = useState(true);

  const [speed, setSpeed] = useState(55);
  const speeds = [55, 62, 70];

  const [stop, setStop] = useState(busStops[1]);
  const [time, setTime] = useState(5);

  const [progress, setProgress] = useState(0);
  const progresses = [0, 35, 70, 100];
  
    useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(prevSpeed => {
        const target = speeds[Math.floor(Math.random() * speeds.length)];
        const step = 3;

        if (prevSpeed < target) return Math.min(prevSpeed + step, target);
        if (prevSpeed > target) return Math.max(prevSpeed - step, target);

        return prevSpeed;
      });
    }, 2000);

    const interval2 = setInterval(() => {
      setStop(prevStop => {
        const currentIndex = busStops.indexOf(prevStop);
        const nextIndex = currentIndex !== -1 && currentIndex + 1 < busStops.length ? currentIndex + 1 : 0;
        setProgress(prev => {
                let newp = progresses[nextIndex]
                return newp;
              });
        return busStops[nextIndex];
      });

      setSpeed(0);
      setTime(6);
    }, 50000);

    const interval3 = setInterval(() => {
      setTime( prevTime => {
        let nextTime = prevTime - 1;
        return nextTime;
      })
    }, 10000);

  return () => {
    clearInterval(interval);
    clearInterval(interval2);
    clearInterval(interval3);
  };
}, []);


  return (
    <div className="lego-bus-driver-view">
      <div className="lego-bus-driver-header">
        <h2>Driver's View</h2>
        <p>Live view from the front of the bus</p>
      </div>

      <div className="lego-bus-driver-content">
        <div>
          {/* Video Feed Simulation */}
          <div className="lego-bus-camera-feed">
            <div className="lego-aspect-video">
              <div className="video-wrapper">
                <ImageWithFallback
                  src={Roadrview}
                  alt="Driver's view from the bus"
                />
                <div className="lego-bus-live-indicator">LIVE</div>
              </div>

              {/* Camera info overlay */}
              <div className="lego-bus-camera-overlay">
                <div className="lego-bus-camera-info">
                  <div>
                    <Camera className="lego-w-4 lego-h-4" />
                    <span>Front Camera - HD 1080p</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="lego-bus-camera-control"
                >
                  {isPlaying ? (
                    <Pause className="lego-w-5 lego-h-5" />
                  ) : (
                    <Play className="lego-w-5 lego-h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="lego-bus-stats-grid">
            <div className="lego-bus-stat-card">
              <h3 className="lego-bus-stat-label">Current Speed</h3>
              <p className="lego-bus-stat-value lego-text-3xl lego-text-blue-600">{speed} km/h</p>
            </div>
            
            <div className="lego-bus-stat-card">
              <h3 className="lego-bus-stat-label">Next Stop</h3>
              <p className="lego-bus-stat-value lego-text-xl lego-text-gray-900">{stop.name}</p>
              <p className="lego-bus-stat-detail">In {time} minutes</p>
            </div>
            
            <div className="lego-bus-stat-card">
              <h3 className="lego-bus-stat-label">Route Progress</h3>
              <div className="lego-flex lego-items-center lego-gap-2">
                <p className="lego-bus-stat-value lego-text-3xl lego-text-green-600">{progress}%</p>
                <p className="lego-bus-stat-detail">Complete</p>
              </div>
            </div>
          </div>

          <div className="lego-bus-info-banner">
            <h3>About Driver View</h3>
            <p>
              This view shows a live feed from the front-facing camera mounted on the bus. 
              Passengers can enjoy seeing the road ahead and get a driver's perspective of 
              navigating through Berlin's historic streets. The feed updates in real-time 
              as the bus moves through the city.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}