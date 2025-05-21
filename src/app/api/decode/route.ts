import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface NHTSAResponse {
  Count: number;
  Message: string;
  Results: Array<Record<string, string>>;
  SearchCriteria?: string;
}

// NHTSA API client for VIN decoding
async function decodeVIN(vin: string) {
  try {
    // Using the DecodeVinValuesExtended endpoint for comprehensive data
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${vin}?format=json`;
    
    console.log(`NHTSA API Request: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`NHTSA API Error: ${response.status} ${response.statusText}`);
      return { error: "Failed to decode VIN", status: response.status };
    }
    
    const data = await response.json() as NHTSAResponse;
    
    // Check if the response has the expected structure
    if (!data?.Results || !Array.isArray(data.Results) || data.Results.length === 0) {
      console.error("NHTSA API returned unexpected data structure");
      return { error: "Invalid response from VIN decoder", status: 500 };
    }
    
    return { data: data.Results[0], status: 200 };
  } catch (error) {
    console.error(`Error decoding VIN: ${error instanceof Error ? error.message : String(error)}`);
    return { error: "Failed to decode VIN", status: 500 };
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const vin = searchParams.get("vin");
  
  if (!vin) {
    return NextResponse.json(
      { error: "VIN parameter is required" },
      { status: 400 }
    );
  }
  
  const result = await decodeVIN(vin);
  
  if (result.status !== 200) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status }
    );
  }
  
  return NextResponse.json(result.data);
}
