"use client";

import React, { useState } from 'react';
import Header from '../../components/Header';
import LoginModal from '../../components/LoginModal';

export default function HowItWorksPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const handleLogin = (email: string, password: string) => {
    // In a real app, this would validate credentials with a backend
    console.log('Login attempt with:', email, password);
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="fixed inset-0 bg-[url('/images/mercedes-bg.jpg')] bg-cover bg-center opacity-20 z-0"></div>
      
      <div className="relative z-10 w-full">
        <Header 
          isLoggedIn={isLoggedIn} 
          onLoginClick={() => setShowLoginModal(true)} 
          onLogoutClick={() => setIsLoggedIn(false)} 
        />
        
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">How VinScope Works</h1>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 shadow-xl mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Advanced Vehicle Verification
            </h2>
            
            <p className="text-white/80 mb-6">
              VinScope provides a comprehensive solution for verifying vehicle information and detecting potentially fraudulent VINs. Our platform connects directly with major automotive manufacturers to validate vehicle data against their official records.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                <div className="text-red-400 text-xl font-bold mb-2">01</div>
                <h3 className="text-lg font-semibold mb-2">VIN Submission</h3>
                <p className="text-white/70 text-sm">Enter any Vehicle Identification Number (VIN) into our secure system.</p>
              </div>
              
              <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                <div className="text-red-400 text-xl font-bold mb-2">02</div>
                <h3 className="text-lg font-semibold mb-2">Multi-Source Verification</h3>
                <p className="text-white/70 text-sm">Our system cross-references the VIN with multiple authoritative databases.</p>
              </div>
              
              <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                <div className="text-red-400 text-xl font-bold mb-2">03</div>
                <h3 className="text-lg font-semibold mb-2">Comprehensive Results</h3>
                <p className="text-white/70 text-sm">Receive detailed vehicle information and verification status within seconds.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Our Technology
            </h2>
            
            <p className="text-white/80 mb-6">
              VinScope leverages partnerships with major automotive manufacturers and industry-leading data providers to deliver the most accurate vehicle verification available.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-red-500/20 p-2 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Manufacturer Partnerships</h3>
                  <p className="text-white/70 text-sm">We work directly with leading automotive manufacturers to access their vehicle databases, ensuring the most accurate verification possible.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-red-500/20 p-2 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Advanced Fraud Detection</h3>
                  <p className="text-white/70 text-sm">Our proprietary algorithms can identify potentially fraudulent VINs by cross-referencing multiple data sources and checking for inconsistencies.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-red-500/20 p-2 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Expanding Capabilities</h3>
                  <p className="text-white/70 text-sm">We&apos;re continuously working to add more manufacturers to our verification network, with the goal of providing comprehensive coverage for all major vehicle brands.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        onLogin={handleLogin} 
      />
    </main>
  );
}
