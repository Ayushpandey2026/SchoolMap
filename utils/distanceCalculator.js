/**
 * utils/distanceCalculator.js
 * Haversine Formula implementation for geographical distance calculation
 * Returns distance in kilometers between two lat/lng coordinates
 */

const EARTH_RADIUS_KM = 6371;

/**
 * Convert degrees to radians
 * @param {number} degrees
 * @returns {number} radians
 */
const toRadians = (degrees) => (degrees * Math.PI) / 180;

/**
 * Calculate the distance between two geographical points using the Haversine formula
 *
 * @param {number} lat1 - User's latitude
 * @param {number} lon1 - User's longitude
 * @param {number} lat2 - School's latitude
 * @param {number} lon2 - School's longitude
 * @returns {number} Distance in kilometers (rounded to 2 decimal places)
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = EARTH_RADIUS_KM * c;

  return Math.round(distance * 100) / 100;
};

module.exports = { calculateDistance };
