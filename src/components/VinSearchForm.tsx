import { useState } from "react";

interface VinSearchFormProps {
  onSearch: (vin: string) => void;
  isLoading: boolean;
}

export default function VinSearchForm({ onSearch, isLoading }: VinSearchFormProps) {
  const [vin, setVin] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vin.trim()) {
      onSearch(vin.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          className="w-full pl-12 pr-28 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all duration-300 shadow-lg"
          placeholder="Enter Vehicle VIN Number"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1.5 px-6 py-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden min-w-[90px] flex items-center justify-center shadow-md hover:shadow-red-500/30"
          disabled={isLoading || !vin.trim()}
        >
          {isLoading ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto transition-opacity duration-300 ease-in-out"></div>
          ) : (
            <span className="transition-all duration-300 ease-in-out font-medium">Search</span>
          )}
        </button>
      </div>
    </form>
  );
}
