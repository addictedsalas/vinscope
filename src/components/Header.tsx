"use client";

import Link from "next/link";

interface HeaderProps {
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
}

export default function Header({ isLoggedIn = false, onLoginClick, onLogoutClick }: HeaderProps) {
  return (
    <header className="w-full py-6 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 relative">
            <div className="absolute inset-0 bg-red-500 rounded-full opacity-80"></div>
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold">VS</span>
          </div>
          <h1 className="text-2xl font-bold text-white">VinScope</h1>
        </div>
      </div>
      
      <nav className="hidden md:flex items-center space-x-8">
        <Link href="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
        <Link href="/how-it-works" className="text-white/80 hover:text-white transition-colors">How It Works</Link>
        <Link href="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link>
      </nav>
      
      <div className="flex items-center gap-3">
        {isLoggedIn ? (
          <>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-white/80 text-sm">Logged In</span>
            </div>
            <button 
              onClick={onLogoutClick}
              className="px-6 py-2.5 border border-white/20 text-white rounded-full hover:bg-white/10 transition-all duration-300 font-medium"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={onLoginClick}
              className="px-6 py-2.5 border border-white/20 text-white rounded-full hover:bg-white/10 transition-all duration-300 font-medium"
            >
              Log In
            </button>
            <button className="px-6 py-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 font-medium shadow-lg hover:shadow-red-500/30">
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
}
