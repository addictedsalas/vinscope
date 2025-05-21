import Link from "next/link";
import Image from "next/image";

export default function Header() {
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
        <Link href="#" className="text-white/80 hover:text-white transition-colors">About</Link>
        <Link href="#" className="text-white/80 hover:text-white transition-colors">Features</Link>
        <Link href="#" className="text-white/80 hover:text-white transition-colors">Contact</Link>
      </nav>
      
      <button className="px-6 py-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 font-medium shadow-lg hover:shadow-red-500/30">
        Sign Up
      </button>
    </header>
  );
}
