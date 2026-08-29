import { UserLocation, CommuteMode, CommuteEstimate } from '@/types';

export const PRESET_KOLKATA_LOCATIONS: UserLocation[] = [
  { name: 'Howrah Station / Railway Complex', latitude: 22.5839, longitude: 88.3433 },
  { name: 'Sealdah Station / Central', latitude: 22.5675, longitude: 88.3712 },
  { name: 'Dum Dum Metro / North Kolkata', latitude: 22.6219, longitude: 88.3934 },
  { name: 'Salt Lake Karunamoyee / Central Park', latitude: 22.5866, longitude: 88.4208 },
  { name: 'New Town City Centre II / Chinar Park', latitude: 22.6318, longitude: 88.4593 },
  { name: 'Garia / Kavi Nazrul Metro (South)', latitude: 22.4649, longitude: 88.3842 },
  { name: 'Behala Chowrasta / South-West', latitude: 22.4975, longitude: 88.3150 },
  { name: 'Park Street / Camac St CBD', latitude: 22.5532, longitude: 88.3524 },
  { name: 'Jadavpur 8B / Sukanta Setu', latitude: 22.4988, longitude: 88.3719 },
  { name: 'Tollygunge / Mahanayak Uttam Kumar', latitude: 22.5023, longitude: 88.3467 },
  { name: 'Shyambazar 5-Point / Hatibagan', latitude: 22.6022, longitude: 88.3714 },
  { name: 'Ultadanga / Hudco Crossing', latitude: 22.5888, longitude: 88.3970 },
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
