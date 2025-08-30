import React, { useEffect, useState } from 'react';

interface DroneStatus {
  name: string;
  status: string;
  battery: number;
  lastDetection: string;
  confidence: number;
  lastUpdate: string;
}

const DroneControl: React.FC = () => {
  const [drone, setDrone] = useState<DroneStatus | null>(null);
  useEffect(() => {
    fetch('/api/drone/status')
      .then(res => res.json())
      .then(setDrone);
  }, []);
  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="font-serif text-2xl font-bold text-primary-900 mb-4">Connected Drone</h2>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img src="/images/drone-live.jpg" alt="Drone Live" className="rounded-xl w-80 h-56 object-cover shadow" />
          <div>
            <div className="font-bold text-lg mb-2">{drone?.name || 'Drone ATAMA-VIS 01'}</div>
            <div className="text-primary-700 mb-2">Status: <span className={drone?.status === 'Active' ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>{drone?.status || 'Unknown'}</span></div>
            <div className="text-primary-700">Battery: {drone?.battery ?? '--'}%</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="font-serif text-2xl font-bold text-primary-900 mb-4">Detection Reports</h2>
        <ul className="list-disc list-inside text-primary-900">
          <li>Last Detection: {drone?.lastDetection || 'N/A'} • Confidence {drone?.confidence ?? '--'}% • {drone?.lastUpdate || ''}</li>
        </ul>
      </div>
    </div>
  );
};

export default DroneControl;
