# VinScope - Mercedes-Benz VIN Lookup & Verification Tool

![VinScope](https://github.com/addictedsalas/vinscope/assets/banner.jpg)

VinScope is a modern web application that allows users to look up detailed information about Mercedes-Benz vehicles using their Vehicle Identification Number (VIN). The application not only retrieves vehicle specifications from the official Mercedes-Benz API but also decodes the VIN using the NHTSA database to verify legitimacy and detect potentially fraudulent VINs.

## Features

- **Mercedes-Benz API Integration**: Retrieves comprehensive vehicle data from the official Mercedes-Benz database
- **VIN Decoding**: Uses the NHTSA API to decode VIN numbers and extract vehicle specifications
- **Fraud Detection**: Cross-references Mercedes-Benz data with NHTSA data to identify potentially fraudulent VINs
- **Detailed Vehicle Information**: Displays comprehensive vehicle details including:
  - Vehicle specifications
  - Technical data
  - Factory options
  - VIN decoding information
- **Modern UI**: Clean, responsive interface with smooth animations and intuitive design

## Technology Stack

- **Framework**: [T3 Stack](https://create.t3.gg/) (Next.js, TypeScript, Tailwind CSS)
- **API Integration**: Mercedes-Benz Vehicle Specifications API, NHTSA VIN Decoder API
- **Styling**: Tailwind CSS with custom components
- **Deployment**: Vercel/Netlify ready

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Mercedes-Benz API key (for vehicle data retrieval)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/addictedsalas/vinscope.git
   cd vinscope
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file with your Mercedes-Benz API key
   ```
   MERCEDES_API_KEY=your_api_key_here
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter a Mercedes-Benz VIN in the search field
2. View detailed vehicle information
3. Check the VIN Decode tab to see NHTSA decoding information
4. Verify legitimacy status to ensure the VIN is authentic

## API Documentation

### Mercedes-Benz API

The application uses the Mercedes-Benz Vehicle Specifications API to retrieve detailed vehicle information. Documentation can be found at [Mercedes-Benz Developer Portal](https://developer.mercedes-benz.com/products/vehicle_specifications).

### NHTSA VIN Decoder API

The application uses the NHTSA VIN Decoder API to decode VIN numbers and extract vehicle specifications. Documentation can be found at [NHTSA API Documentation](https://vpic.nhtsa.dot.gov/api/).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Mercedes-Benz API](https://developer.mercedes-benz.com/)
- [NHTSA API](https://vpic.nhtsa.dot.gov/api/)
- [T3 Stack](https://create.t3.gg/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next.js](https://nextjs.org/)
