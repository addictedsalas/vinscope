import { useState } from "react";

interface DecodedVin {
  Make?: string;
  Model?: string;
  ModelYear?: string;
  Manufacturer?: string;
  VehicleType?: string;
  BodyClass?: string;
  DriveType?: string;
  EngineConfiguration?: string;
  EngineCylinders?: string;
  EngineHP?: string;
  FuelTypePrimary?: string;
  Trim?: string;
  Series?: string;
  VIN?: string;
  PlantCity?: string;
  PlantCountry?: string;
  PlantState?: string;
  ErrorCode?: string;
  ErrorText?: string;
  [key: string]: any;
}

interface VehicleData {
  vehicleData: {
    brand?: { text: string };
    model?: string;
    modelName?: string;
    longType?: string;
    vin11?: string;
    paint?: { description: string };
    upholstery?: { description: string };
    enginetype?: { text: string };
    transmissiontype?: { text: string };
    body?: { text: string };
    powerkw?: number;
    powerps?: number;
    cylindercapacity?: number;
    technicalData?: Array<{ id: string; text: string; value: string; unit?: string }>;
    options?: Array<{ code: string; description: string }>;
    [key: string]: any;
  };
}

interface VehicleInfoProps {
  vehicleData: VehicleData | null;
  decodedVin: DecodedVin | null;
  error: string | null;
  isLegitimate: boolean;
  potentiallyFraudulent?: boolean;
  message?: string;
}

export default function VehicleInfo({ vehicleData, decodedVin, error, isLegitimate, potentiallyFraudulent, message }: VehicleInfoProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'technical' | 'options' | 'vin-decode'>('overview');

  if (error) {
    return (
      <div className="w-full max-w-4xl mt-8 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-white shadow-xl transition-all duration-300 min-h-[200px]">
        <div className="flex flex-col items-center justify-center text-center mb-6">
          {potentiallyFraudulent ? (
            <div className="bg-yellow-500/20 p-4 rounded-xl mb-6 w-full max-w-2xl">
              <div className="flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h2 className="text-2xl font-bold text-yellow-500">Potential Fraudulent VIN</h2>
              </div>
              <p className="text-white/90 text-lg">{message}</p>
            </div>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-red-500 mb-2">{error}</h2>
              <p className="text-white/70 mb-6">{message || "Please check the VIN and try again"}</p>
            </>
          )}
        </div>
        
        {decodedVin && (
          <div className="border-t border-white/20 pt-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/60 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              VIN Decoded Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl">
              {decodedVin.Make && (
                <div className="flex justify-between border-b border-white/10 py-2">
                  <span className="text-white/70 font-medium">Make:</span>
                  <span className="font-semibold">{decodedVin.Make}</span>
                </div>
              )}
              {decodedVin.Model && (
                <div className="flex justify-between border-b border-white/10 py-2">
                  <span className="text-white/70 font-medium">Model:</span>
                  <span className="font-semibold">{decodedVin.Model}</span>
                </div>
              )}
              {decodedVin.ModelYear && (
                <div className="flex justify-between border-b border-white/10 py-2">
                  <span className="text-white/70 font-medium">Year:</span>
                  <span className="font-semibold">{decodedVin.ModelYear}</span>
                </div>
              )}
              {decodedVin.VehicleType && (
                <div className="flex justify-between border-b border-white/10 py-2">
                  <span className="text-white/70 font-medium">Vehicle Type:</span>
                  <span className="font-semibold">{decodedVin.VehicleType}</span>
                </div>
              )}
              {decodedVin.BodyClass && (
                <div className="flex justify-between border-b border-white/10 py-2">
                  <span className="text-white/70 font-medium">Body Style:</span>
                  <span className="font-semibold">{decodedVin.BodyClass}</span>
                </div>
              )}
              {decodedVin.FuelTypePrimary && (
                <div className="flex justify-between border-b border-white/10 py-2">
                  <span className="text-white/70 font-medium">Fuel Type:</span>
                  <span className="font-semibold">{decodedVin.FuelTypePrimary}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!vehicleData) {
    return <div className="min-h-[200px] w-full"></div>; // Empty space to prevent layout shifts
  }

  const { vehicleData: vehicle } = vehicleData;

  // Extract key technical specifications
  const findTechnicalData = (id: string) => {
    return vehicle.technicalData?.find(item => item.id === id);
  };

  const power = `${vehicle.powerkw} kW (${vehicle.powerps} PS)`;
  const engineSize = vehicle.cylindercapacity ? `${vehicle.cylindercapacity / 1000}L` : 'N/A';
  const acceleration = findTechnicalData('47T')?.value || 'N/A';
  const topSpeed = findTechnicalData('46T')?.value || 'N/A';
  const fuelConsumption = findTechnicalData('87T')?.value || 'N/A';

  return (
    <div className="w-full max-w-4xl mt-8 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-white shadow-xl transition-all duration-300 min-h-[400px]">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 bg-red-500/80 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold">{vehicle.brand?.text} {vehicle.longType}</h1>
          </div>
          <p className="text-xl text-white/80">VIN: <span className="font-mono">{vehicle.vin11}</span></p>
        </div>
        <div className="mt-4 md:mt-0 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
          <p className="text-sm text-white/60">Model Year</p>
          <p className="text-xl font-semibold">{vehicle.modelYear || 'N/A'}</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex border-b border-white/20 overflow-x-auto hide-scrollbar">
          <button
            className={`px-6 py-3 font-medium transition-all duration-300 ${activeTab === 'overview' ? 'border-b-2 border-red-500 text-white' : 'text-white/60 hover:text-white/90'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-6 py-3 font-medium transition-all duration-300 ${activeTab === 'technical' ? 'border-b-2 border-red-500 text-white' : 'text-white/60 hover:text-white/90'}`}
            onClick={() => setActiveTab('technical')}
          >
            Technical Data
          </button>
          <button
            className={`px-6 py-3 font-medium transition-all duration-300 ${activeTab === 'options' ? 'border-b-2 border-red-500 text-white' : 'text-white/60 hover:text-white/90'}`}
            onClick={() => setActiveTab('options')}
          >
            Options
          </button>
          <button
            className={`px-6 py-3 font-medium transition-all duration-300 ${activeTab === 'vin-decode' ? 'border-b-2 border-red-500 text-white' : 'text-white/60 hover:text-white/90'}`}
            onClick={() => setActiveTab('vin-decode')}
          >
            VIN Decode
          </button>
        </div>
        
        {!isLegitimate && decodedVin && (
          <div className="mt-4 bg-yellow-500/20 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="font-semibold text-yellow-500">Verification Warning</span>
            </div>
            <p className="text-white/90 text-sm">This VIN could not be verified in the Mercedes-Benz database. The information shown is based on the VIN decoding only.</p>
          </div>
        )}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Vehicle Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-white/70 font-medium">Model:</span>
                <span className="font-semibold">{vehicle.modelName}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-white/70 font-medium">Type:</span>
                <span className="font-semibold">{vehicle.longType}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-white/70 font-medium">Body:</span>
                <span className="font-semibold">{vehicle.body?.text}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-white/70 font-medium">Color:</span>
                <span className="font-semibold">{vehicle.paint?.description}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 font-medium">Interior:</span>
                <span className="font-semibold">{vehicle.upholstery?.description}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Performance
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-white/70 font-medium">Engine:</span>
                <span className="font-semibold">{vehicle.enginetype?.text}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-white/70 font-medium">Power:</span>
                <span className="font-semibold">{power}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-white/70 font-medium">Engine Size:</span>
                <span className="font-semibold">{engineSize}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-white/70 font-medium">Acceleration (0-100 km/h):</span>
                <span className="font-semibold">{acceleration} sec</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 font-medium">Top Speed:</span>
                <span className="font-semibold">{topSpeed} km/h</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'technical' && (
        <div className="bg-white/5 rounded-xl p-6 border border-white/10 shadow-lg">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Technical Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {vehicle.technicalData?.map((item) => (
              <div key={item.id} className="flex justify-between border-b border-white/10 py-3 hover:bg-white/5 transition-colors rounded px-2">
                <span className="text-white/70 font-medium">{item.text}:</span>
                <span className="font-semibold">{item.value} {item.unit || ''}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'options' && (
        <div className="bg-white/5 rounded-xl p-6 border border-white/10 shadow-lg">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Vehicle Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {vehicle.options?.map((option) => (
              <div key={option.code} className="flex gap-2 py-2 px-3 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                <span className="text-red-400 font-mono font-semibold min-w-[50px]">{option.code}:</span>
                <span className="text-white/90">{option.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'vin-decode' && decodedVin && (
        <div className="bg-white/5 rounded-xl p-6 border border-white/10 shadow-lg">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
            VIN Decode Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {Object.entries(decodedVin).map(([key, value]) => {
              // Skip empty values, ErrorCode, ErrorText, and VIN (already shown elsewhere)
              if (!value || key === 'ErrorCode' || key === 'ErrorText' || key === 'VIN') return null;
              
              return (
                <div key={key} className="flex justify-between border-b border-white/10 py-3 hover:bg-white/5 transition-colors rounded px-2">
                  <span className="text-white/70 font-medium">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className="font-semibold">{value}</span>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 bg-white/5 p-4 rounded-lg border border-white/10">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              VIN Verification Status
            </h3>
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full mr-2 ${isLegitimate ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className={isLegitimate ? 'text-green-500' : 'text-yellow-500'}>
                {isLegitimate ? 'Verified by Mercedes-Benz' : 'Not verified in Mercedes-Benz database'}
              </span>
            </div>
            <p className="text-white/70 text-sm mt-2">
              {isLegitimate 
                ? 'This VIN has been verified as legitimate in the official Mercedes-Benz database.'
                : 'This VIN could not be verified in the official Mercedes-Benz database. The information shown is based on the VIN decoding only.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
