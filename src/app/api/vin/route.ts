import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface NHTSAResponse {
  Count: number;
  Message: string;
  Results: Array<Record<string, string>>;
  SearchCriteria?: string;
}

type ApiResponse<T> = {
  data: T;
  status: number;
} | {
  error: string;
  status: number;
};

// Mercedes API client implementation in TypeScript
class MercedesAPI {
  private apiKey: string;
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.mercedes-benz.com/vehicle_specifications/v1";
    this.headers = {
      "accept": "application/json",
      "x-api-key": apiKey
    };
  }

  async getVehicleInfo(vin: string, locale = "en_US") {
    const url = `${this.baseUrl}/vehicles/${vin}`;
    const params = new URLSearchParams({
      locale,
      payloadNullValues: "false"
    });

    try {
      console.log(`API Request Details:`);
      console.log(`URL: ${url}`);
      console.log(`Headers: ${JSON.stringify(this.headers, null, 2)}`);
      console.log(`Parameters: ${params.toString()}`);

      const response = await fetch(`${url}?${params.toString()}`, {
        headers: this.headers,
      });

      console.log(`Response Status Code: ${response.status}`);

      if (response.status === 401) {
        console.error("Error: Authentication failed. Please check your API key.");
        return { error: "Authentication failed", status: 401 };
      } else if (response.status === 404) {
        console.error(`Error: Vehicle with VIN ${vin} not found.`);
        return { error: `Vehicle with VIN ${vin} not found`, status: 404 };
      } else if (response.status !== 200) {
        console.error(`Error: Unexpected status code ${response.status}`);
        const text = await response.text();
        console.error(`Response content: ${text}`);
        return { error: `Unexpected error: ${text}`, status: response.status };
      } else {
        const data = await response.json();
        return { data, status: 200 };
      }
    } catch (error) {
      console.error(`Error making API request: ${error instanceof Error ? error.message : String(error)}`);
      return { error: "Failed to fetch vehicle information", status: 500 };
    }
  }
}

// API Key - In a production environment, this should be stored in environment variables
const API_KEY = "ddee6926-e2ec-43da-8d1b-fe7faea80e99";

// Function to decode VIN using NHTSA API
async function decodeVIN(vin: string): Promise<ApiResponse<Record<string, string> | undefined>> {
  try {
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/${vin}?format=json`;
    console.log(`NHTSA API Request: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`NHTSA API Error: ${response.status} ${response.statusText}`);
      return { error: "Failed to decode VIN", status: response.status };
    }
    
    const data = await response.json() as NHTSAResponse;
    
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
  const locale = searchParams.get("locale") ?? "en_US";

  if (!vin) {
    return NextResponse.json(
      { error: "VIN parameter is required" },
      { status: 400 }
    );
  }

  // Step 1: Decode the VIN using NHTSA API
  const decodedVinResult = await decodeVIN(vin);
  const decodedVin = 'data' in decodedVinResult && decodedVinResult.data ? decodedVinResult.data : null;
  
  // Step 2: Check the Mercedes-Benz database
  const client = new MercedesAPI(API_KEY);
  const mercedesResult = await client.getVehicleInfo(vin, locale);
  
  // Step 3: Combine the results and determine legitimacy
  const isLegitimate = mercedesResult.status === 200;
  const response = {
    vin,
    decodedVin,
    mercedesData: mercedesResult.status === 200 ? mercedesResult.data : null,
    isLegitimate,
    error: mercedesResult.status !== 200 ? mercedesResult.error : null,
    status: mercedesResult.status
  };
  
  // If we couldn't decode the VIN but Mercedes API found it, it's still legitimate
  if (!decodedVin && isLegitimate) {
    return NextResponse.json({
      ...response,
      decodingError: "Could not decode VIN, but Mercedes-Benz verified it as legitimate"
    });
  }
  
  // If we couldn't find it in Mercedes database but could decode it, it might be fraudulent
  if (decodedVin && !isLegitimate) {
    // Check if it's a Mercedes-Benz vehicle according to NHTSA
    const make = decodedVin.Make ?? "";
    const manufacturer = decodedVin.Manufacturer ?? "";
    const isMercedesVIN = (
      make.toLowerCase().includes("mercedes") ||
      manufacturer.toLowerCase().includes("mercedes")
    );
    
    // Only flag as potentially fraudulent if NHTSA says it's a Mercedes
    if (isMercedesVIN) {
      return NextResponse.json({
        ...response,
        potentiallyFraudulent: true,
        message: "This VIN decodes as a Mercedes-Benz vehicle but is not found in the official Mercedes-Benz database. It may be fraudulent or the VIN may be incorrect."
      }, { status: 404 });
    }
    
    // If it's not a Mercedes according to NHTSA, just return not found
    return NextResponse.json({
      ...response,
      message: "This VIN does not appear to be a Mercedes-Benz vehicle."
    }, { status: 404 });
  }
  
  // If both APIs succeeded, return the combined data
  if (decodedVin && isLegitimate) {
    return NextResponse.json(response);
  }
  
  // If both APIs failed, return an error
  return NextResponse.json({
    ...response,
    message: "Could not verify or decode this VIN. Please check the VIN and try again."
  }, { status: 400 });
}
