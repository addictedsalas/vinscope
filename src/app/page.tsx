"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "~/components/Header";
import VinSearchForm from "~/components/VinSearchForm";
import VehicleInfo from "~/components/VehicleInfo";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState<{ vehicleData: Record<string, unknown> } | null>(null);
  const [decodedVin, setDecodedVin] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLegitimate, setIsLegitimate] = useState(false);
  const [potentiallyFraudulent, setPotentiallyFraudulent] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);

  interface ApiResponse {
    decodedVin?: Record<string, string>;
    isLegitimate: boolean;
    potentiallyFraudulent?: boolean;
    message?: string;
    mercedesData?: Record<string, unknown>;
    error?: string;
  }

  const handleSearch = async (vin: string) => {
    setIsLoading(true);
    setError(null);
    setVehicleData(null);
    setDecodedVin(null);
    setIsLegitimate(false);
    setPotentiallyFraudulent(false);
    setMessage(undefined);
    
    try {
      const response = await fetch(`/api/vin?vin=${vin}`);
      const data = await response.json() as ApiResponse;
      
      // Set decoded VIN data if available
      if (data.decodedVin) {
        setDecodedVin(data.decodedVin as Record<string, string>);
      }
      
      // Set legitimacy status
      setIsLegitimate(data.isLegitimate === true);
      
      // Handle potentially fraudulent VINs
      if (data.potentiallyFraudulent) {
        setPotentiallyFraudulent(true);
        if (data.message) {
          setMessage(data.message);
        }
      } else if (data.message) {
        setMessage(data.message);
      }
      
      // Set vehicle data if available
      if (data.mercedesData) {
        setVehicleData({ vehicleData: data.mercedesData as Record<string, unknown> });
      }
      
      // Set error if present
      if (!response.ok) {
        setError(data.error ?? "Failed to retrieve vehicle information");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center bg-black text-white">
      {/* Background Image with Parallax Effect */}
      <div className="fixed inset-0 z-0 h-screen w-screen overflow-hidden">
        <Image
          src="/images/landing_page_bg.jpg"
          alt="Background"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="opacity-70"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full flex flex-col min-h-screen">
        <Header />
        
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="relative mb-12">
              {/* Decorative elements */}
              <div className="absolute -left-24 -top-24 w-48 h-48 bg-red-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -right-16 top-8 w-32 h-32 bg-red-500/30 rounded-full blur-2xl"></div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-center relative z-10">
                Welcome.
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-10 text-center max-w-2xl mx-auto">
                Enter your Mercedes-Benz VIN to retrieve detailed vehicle information
              </p>
              
              <div className="w-full max-w-md mx-auto relative z-10">
                <VinSearchForm onSearch={handleSearch} isLoading={isLoading} />
              </div>
            </div>
            
            <VehicleInfo 
              vehicleData={vehicleData} 
              decodedVin={decodedVin} 
              error={error} 
              isLegitimate={isLegitimate} 
              potentiallyFraudulent={potentiallyFraudulent} 
              message={message} 
            />
          </div>
        </div>
        
        <footer className="relative z-10 w-full py-4 text-center text-white/60 text-sm">
          &copy; {new Date().getFullYear()} VinScope. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
