import { UserLocation, CommuteMode, CommuteEstimate } from '@/types';

export interface ExtendedKolkataLocation extends UserLocation {
  category?: 'Central' | 'North' | 'South' | 'IT / East' | 'South-West' | 'Howrah' | 'Metro Hub';
  landmark?: string;
}

export const PRESET_KOLKATA_LOCATIONS: ExtendedKolkataLocation[] = [
  // Major Transit & Railway Terminals
  { name: 'Howrah Railway Station / Complex', latitude: 22.5839, longitude: 88.3433, category: 'Metro Hub', landmark: 'Howrah Bridge / Central Transit' },
  { name: 'Sealdah Railway Station / Court', latitude: 22.5675, longitude: 88.3712, category: 'Metro Hub', landmark: 'Green Line Metro / Central' },
  { name: 'Kolkata Airport (CCU / NSCBI)', latitude: 22.6547, longitude: 88.4467, category: 'North', landmark: 'VIP Road / Terminal 2' },
  { name: 'Santragachi Junction / Kona Expressway', latitude: 22.5794, longitude: 88.2831, category: 'Howrah', landmark: 'South Eastern Rail Terminal' },
  { name: 'Kolkata Chitpur Station / Belgachia', latitude: 22.6015, longitude: 88.3789, category: 'North', landmark: 'North Kolkata Junction' },

  // Iconic Central Kolkata Landmarks & CBD
  { name: 'Park Street / Camac Street CBD', latitude: 22.5532, longitude: 88.3524, category: 'Central', landmark: 'Commercial & Nightlife Hub' },
  { name: 'Esplanade / Dharmatala / Curzon Park', latitude: 22.5645, longitude: 88.3518, category: 'Central', landmark: 'Major Bus & Metro Junction' },
  { name: 'Victoria Memorial / Rabindra Sadan / Exide', latitude: 22.5448, longitude: 88.3426, category: 'Central', landmark: 'Cathedral / Cultural Hub' },
  { name: 'BBD Bagh / Dalhousie Square', latitude: 22.5726, longitude: 88.3490, category: 'Central', landmark: 'Writers Building / Heritage CBD' },
  { name: 'College Street / Boipara / Calcutta University', latitude: 22.5744, longitude: 88.3639, category: 'Central', landmark: 'Presidency / Coffee House' },
  { name: 'Chandni Chowk / E-Mall / Bowbazar', latitude: 22.5668, longitude: 88.3572, category: 'Central', landmark: 'Electronics & Hardware Market' },
  { name: 'Princes Ghat / Strand Road / Babughat', latitude: 22.5583, longitude: 88.3326, category: 'Central', landmark: 'Hooghly Riverfront Promenade' },
  { name: 'Girish Park / Sovabazar / Bagbazar', latitude: 22.5936, longitude: 88.3644, category: 'Central', landmark: 'Kumartuli / Heritage Ghats' },

  // Salt Lake & New Town (IT Corridors & Planned Townships)
  { name: 'Salt Lake Karunamoyee / Central Park', latitude: 22.5866, longitude: 88.4208, category: 'IT / East', landmark: 'Karunamoyee Bus Terminal / Metro' },
  { name: 'Salt Lake Sector V / College More / Webel', latitude: 22.5802, longitude: 88.4332, category: 'IT / East', landmark: 'Sector V IT SEZ Center' },
  { name: 'Salt Lake City Centre 1 / DC Block', latitude: 22.5898, longitude: 88.4085, category: 'IT / East', landmark: 'CC1 Mall / Salt Lake Center' },
  { name: 'Salt Lake Ultadanga / GD & FD Blocks', latitude: 22.5888, longitude: 88.4010, category: 'IT / East', landmark: 'Labony Estate / Salt Lake Entry' },
  { name: 'New Town Biswa Bangla Gate / Action Area I', latitude: 22.5995, longitude: 88.4682, category: 'IT / East', landmark: 'Major IT & Financial Center' },
  { name: 'New Town City Centre 2 / Chinar Park', latitude: 22.6318, longitude: 88.4593, category: 'IT / East', landmark: 'CC2 Mall / Rajarhat Main Road' },
  { name: 'New Town Eco Park / Mother Wax Museum', latitude: 22.6072, longitude: 88.4725, category: 'IT / East', landmark: 'Major Attraction & IT Park' },
  { name: 'New Town Akankha More / Uniworld City', latitude: 22.6175, longitude: 88.4820, category: 'IT / East', landmark: 'Action Area II / Downtown' },
  { name: 'Rajarhat Chowmatha / 91 Bus Stand', latitude: 22.6248, longitude: 88.4985, category: 'IT / East', landmark: 'Rajarhat Main Market' },
  { name: 'Kestopur / VIP Road Footbridge', latitude: 22.5956, longitude: 88.4285, category: 'IT / East', landmark: 'Sector V Access Point' },
  { name: 'Baguiati / Jora Mandir / VIP Road', latitude: 22.6145, longitude: 88.4290, category: 'North', landmark: 'North-East Kolkata Corridor' },

  // South Kolkata Prime Localities & Metro Stations
  { name: 'Gariahat / Triangular Park / Ballygunge Phari', latitude: 22.5186, longitude: 88.3654, category: 'South', landmark: 'Shopping Hub / South Kolkata Core' },
  { name: 'Jadavpur 8B / Jadavpur University / Sukanta Setu', latitude: 22.4988, longitude: 88.3719, category: 'South', landmark: 'University / Railway Hub' },
  { name: 'Garia / Kavi Nazrul Metro / Mahamayatala', latitude: 22.4649, longitude: 88.3842, category: 'South', landmark: 'Southern Terminal Hub / Bypass' },
  { name: 'Tollygunge / Mahanayak Uttam Kumar / Golf Club', latitude: 22.5023, longitude: 88.3467, category: 'South', landmark: 'Studio Para / RCGC Club' },
  { name: 'Kalighat Temple / Rashbehari Avenue', latitude: 22.5195, longitude: 88.3458, category: 'South', landmark: 'Historic Temple & Metro' },
  { name: 'Ballygunge Circular Road / Hazra Crossing', latitude: 22.5278, longitude: 88.3582, category: 'South', landmark: 'South Central Kolkata' },
  { name: 'Bhawanipur / Netaji Bhavan / Jadu Babu Bazar', latitude: 22.5345, longitude: 88.3482, category: 'South', landmark: 'Historic Residential Hub' },
  { name: 'South City Mall / Prince Anwar Shah Road', latitude: 22.5015, longitude: 88.3615, category: 'South', landmark: 'Shopping & Highrise Complex' },
  { name: 'Ruby Hospital / Kasba E.M. Bypass Crossing', latitude: 22.5135, longitude: 88.3968, category: 'South', landmark: 'Hemanta Mukherjee Metro / IT' },
  { name: 'Kasba New Market / Bosepukur / Acropolis Mall', latitude: 22.5175, longitude: 88.3882, category: 'South', landmark: 'Acropolis Mall / Kasba Core' },
  { name: 'Mukundapur / Peerless Hospital / Medica', latitude: 22.4925, longitude: 88.3995, category: 'South', landmark: 'Healthcare & Hospital Corridor' },
  { name: 'Santoshpur / Jadavpur East', latitude: 22.4935, longitude: 88.3815, category: 'South', landmark: 'Residential Township' },
  { name: 'Patuli / Floating Market / Highland Park', latitude: 22.4785, longitude: 88.3912, category: 'South', landmark: 'Bypass Residential Hub' },
  { name: 'Bansdroni / Masterda Surya Sen Metro', latitude: 22.4795, longitude: 88.3625, category: 'South', landmark: 'NSC Bose Road Metro' },
  { name: 'Naktala / Geetanjali Metro', latitude: 22.4715, longitude: 88.3675, category: 'South', landmark: 'Residential South Corridor' },
  { name: 'Kudghat / Netaji Metro Station', latitude: 22.4895, longitude: 88.3495, category: 'South', landmark: 'Tolly Nullah Corridor' },
  { name: 'Baghajatin / Ganguly Bagan / Ramgarh', latitude: 22.4845, longitude: 88.3745, category: 'South', landmark: 'Railway Station & Market' },
  { name: 'Narendrapur / Kamalgazi / Ramakrishna Mission', latitude: 22.4412, longitude: 88.3985, category: 'South', landmark: 'RKM Campus / Southern Bypass' },
  { name: 'Sonarpur Junction / Rajpur', latitude: 22.4415, longitude: 88.4285, category: 'South', landmark: 'South 24 Parganas Rail Hub' },

  // South-West & Diamond Harbour Corridor
  { name: 'Behala Chowrasta / Diamond Harbour Road', latitude: 22.4975, longitude: 88.3150, category: 'South-West', landmark: 'South-West Major Commercial Hub' },
  { name: 'Behala Sakherbazar / Silpara', latitude: 22.4825, longitude: 88.3115, category: 'South-West', landmark: 'DH Road Metro Line' },
  { name: 'Thakurpukur / 3A Bus Stand / Cancer Hospital', latitude: 22.4645, longitude: 88.3045, category: 'South-West', landmark: 'Major Bus Terminus' },
  { name: 'Joka / Diamond Park / IIM Calcutta', latitude: 22.4452, longitude: 88.2985, category: 'South-West', landmark: 'IIM Campus / Purple Line Metro' },
  { name: 'Taratala / Mint / Majerhat Bridge', latitude: 22.5185, longitude: 88.3182, category: 'South-West', landmark: 'Industrial Estate / Port Road' },
  { name: 'Alipore / Zoo / Command Hospital', latitude: 22.5365, longitude: 88.3325, category: 'South-West', landmark: 'National Library / Zoological Garden' },
  { name: 'New Alipore / Block G / Chetla', latitude: 22.5125, longitude: 88.3345, category: 'South-West', landmark: 'Upscale Residential Township' },
  { name: 'Khidirpur / Fancy Market / Port Area', latitude: 22.5395, longitude: 88.3245, category: 'South-West', landmark: 'Dock & Port Heritage Market' },

  // North Kolkata & Northern Suburbs
  { name: 'Shyambazar 5-Point / Hatibagan Market', latitude: 22.6022, longitude: 88.3714, category: 'North', landmark: 'Historic 5-Point / Theatre Para' },
  { name: 'Dum Dum Metro / Dum Dum Junction', latitude: 22.6219, longitude: 88.3934, category: 'North', landmark: 'Major North Kolkata Transit Interchange' },
  { name: 'Lake Town / Clock Tower / Jaya Cinema', latitude: 22.6035, longitude: 88.4035, category: 'North', landmark: 'Big Ben Replica / Lake Town Block A' },
  { name: 'Ultadanga / Hudco Crossing / Bidhannagar Station', latitude: 22.5888, longitude: 88.3970, category: 'North', landmark: 'EM Bypass / VIP Road Gateway' },
  { name: 'Kankurgachi / Phoolbagan Metro', latitude: 22.5702, longitude: 88.3905, category: 'North', landmark: 'East-West Metro Station' },
  { name: 'Belgharia / Rathtala / Feeder Road', latitude: 22.6515, longitude: 88.3845, category: 'North', landmark: 'North Suburban Rail Hub' },
  { name: 'Dunlop Crossing / Baranagar Metro', latitude: 22.6485, longitude: 88.3725, category: 'North', landmark: 'BT Road Gateway' },
  { name: 'Dakshineswar Kali Temple / Skywalk', latitude: 22.6535, longitude: 88.3585, category: 'North', landmark: 'Pilgrimage Shrine & Blue Line Metro' },
  { name: 'Sodepur / BT Road / Panihati', latitude: 22.6985, longitude: 88.3875, category: 'North', landmark: 'BT Road Commercial Strip' },
  { name: 'Barrackpore / Cantonment / Station', latitude: 22.7615, longitude: 88.3785, category: 'North', landmark: 'Historic Cantonment Hub' },
  { name: 'Barasat / Champadali More', latitude: 22.7215, longitude: 88.4845, category: 'North', landmark: 'District Headquarters / NH12' },
  { name: 'Madhyamgram / Jessore Road', latitude: 22.6985, longitude: 88.4535, category: 'North', landmark: 'Airport Northern Corridor' },

  // Howrah & West Bank
  { name: 'Shibpur / IIEST / Botanical Garden', latitude: 22.5552, longitude: 88.3085, category: 'Howrah', landmark: 'Great Banyan Tree / IIEST Campus' },
  { name: 'Nabanna / Mandirtala / Toll Plaza', latitude: 22.5585, longitude: 88.3245, category: 'Howrah', landmark: 'State Secretariat Building' },
  { name: 'Belur Math / Bally / Hooghly West', latitude: 22.6325, longitude: 88.3565, category: 'Howrah', landmark: 'Ramakrishna Math World HQ' },
  { name: 'Salkia / Bandhaghat / Golabari', latitude: 22.6025, longitude: 88.3515, category: 'Howrah', landmark: 'North Howrah Trading Hub' },

  // East Kolkata & SEZ
  { name: 'Science City / Topsia / Silver Spring', latitude: 22.5412, longitude: 88.3995, category: 'IT / East', landmark: 'Science Centre / Bypass Link' },
  { name: 'Chingrighata / Beleghata / Sukanta Nagar', latitude: 22.5685, longitude: 88.4112, category: 'IT / East', landmark: 'Sector V Western Gateway' },
  { name: 'Bantala IT SEZ / Leather Complex', latitude: 22.5186, longitude: 88.4410, category: 'IT / East', landmark: 'Cognizant SEZ / Bantala Hub' },
  { name: 'Tangra / Chinatown', latitude: 22.5515, longitude: 88.3885, category: 'Central', landmark: 'Famous Chinese Dining District' },
];

export const DEFAULT_USER_LOCATION: UserLocation = PRESET_KOLKATA_LOCATIONS[0]; // Howrah Station

/**
 * Calculates straight-line distance in kilometers using the Haversine formula
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Computes realistic road distance and multimodal travel time estimates across Kolkata
 */
export function computeCommuteEstimate(
  userLoc: UserLocation,
  destLat: number,
  destLng: number,
  activeMode: CommuteMode = 'transit'
): CommuteEstimate {
  const directKm = calculateHaversineDistance(
    userLoc.latitude,
    userLoc.longitude,
    destLat,
    destLng
  );

  // Kolkata road routing circuity factor (actual driving distance is typically 1.25x - 1.4x straight line)
  const roadKm = Math.max(0.8, Math.round(directKm * 1.32 * 10) / 10);

  // Kolkata Speed Matrix (accounting for Green Line / Blue Line Metro, E.M. Bypass, and city traffic)
  // Transit: average 22 km/h + 8 min wait/transfer buffer
  const transitMins = Math.max(8, Math.round((roadKm / 22) * 60 + 8));

  // Driving (Car / Cab): average 19 km/h in Kolkata traffic + 4 min parking/start
  const drivingMins = Math.max(5, Math.round((roadKm / 19) * 60 + 4));

  // Two Wheeler (Bike / Scooter): average 26 km/h navigating traffic
  const twoWheelerMins = Math.max(4, Math.round((roadKm / 26) * 60 + 2));

  // Walking: average 4.5 km/h
  const walkingMins = Math.round((roadKm / 4.5) * 60);

  let activeMinutes = transitMins;
  if (activeMode === 'driving') activeMinutes = drivingMins;
  else if (activeMode === 'two_wheeler') activeMinutes = twoWheelerMins;
  else if (activeMode === 'walking') activeMinutes = walkingMins;

  const formattedTime = formatMinutes(activeMinutes);

  return {
    distanceKm: roadKm,
    transitMinutes: transitMins,
    drivingMinutes: drivingMins,
    twoWheelerMinutes: twoWheelerMins,
    walkingMinutes: walkingMins,
    activeMode,
    formattedTime,
  };
}

export function formatMinutes(mins: number): string {
  if (mins < 60) {
    return `${mins} min`;
  }
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  if (remainingMins === 0) return `${hours} hr`;
  return `${hours} hr ${remainingMins} min`;
}

/**
 * Generates smooth curved road-like waypoint coordinates between two points for map rendering
 */
export function generateRoutePoints(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): [number, number][] {
  const points: [number, number][] = [];
  const steps = 8;

  // Add intermediate curved points slightly offset to simulate Kolkata flyovers/corridors
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const lat = lat1 + (lat2 - lat1) * t;
    const lng = lng1 + (lng2 - lng1) * t;

    // Slight perpendicular arc for road curve simulation
    const arcOffset = Math.sin(t * Math.PI) * 0.008;
    points.push([lat + arcOffset * 0.6, lng + arcOffset]);
  }

  return points;
}
