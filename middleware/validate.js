/**
 * middleware/validate.js
 * Request validation middleware for school data
 */

/**
 * Validates the body payload for adding a school
 */
const validateAddSchool = (req, res, next) => {
  const { name, address, latitude, longitude } = req.body;

  const errors = [];

  // Check required fields
  if (!name || typeof name !== "string" || name.trim() === "") {
    errors.push("School name is required and must be a non-empty string.");
  }

  if (!address || typeof address !== "string" || address.trim() === "") {
    errors.push("Address is required and must be a non-empty string.");
  }

  if (latitude === undefined || latitude === null || latitude === "") {
    errors.push("Latitude is required.");
  } else {
    const lat = parseFloat(latitude);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      errors.push("Latitude must be a valid number between -90 and 90.");
    }
  }

  if (longitude === undefined || longitude === null || longitude === "") {
    errors.push("Longitude is required.");
  } else {
    const lon = parseFloat(longitude);
    if (isNaN(lon) || lon < -180 || lon > 180) {
      errors.push("Longitude must be a valid number between -180 and 180.");
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  // Sanitize
  req.body.name = name.trim();
  req.body.address = address.trim();
  req.body.latitude = parseFloat(latitude);
  req.body.longitude = parseFloat(longitude);

  next();
};

/**
 * Validates query params for listing schools
 */
const validateListSchools = (req, res, next) => {
  const { latitude, longitude } = req.query;

  const errors = [];

  if (latitude === undefined || latitude === "") {
    errors.push("latitude query parameter is required.");
  } else {
    const lat = parseFloat(latitude);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      errors.push("latitude must be a valid number between -90 and 90.");
    }
  }

  if (longitude === undefined || longitude === "") {
    errors.push("longitude query parameter is required.");
  } else {
    const lon = parseFloat(longitude);
    if (isNaN(lon) || lon < -180 || lon > 180) {
      errors.push("longitude must be a valid number between -180 and 180.");
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  req.query.latitude = parseFloat(latitude);
  req.query.longitude = parseFloat(longitude);

  next();
};

module.exports = { validateAddSchool, validateListSchools };
