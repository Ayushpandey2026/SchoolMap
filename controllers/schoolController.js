/**
 * controllers/schoolController.js
 * Handles business logic for school-related API operations
 */

const { pool } = require("../config/db");
const { calculateDistance } = require("../utils/distanceCalculator");

/**
 * POST /addSchool
 * Adds a new school to the database
 */
const addSchool = async (req, res, next) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    const [result] = await pool.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );

    return res.status(201).json({
      success: true,
      message: "School added successfully",
      data: {
        id: result.insertId,
        name,
        address,
        latitude,
        longitude,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /listSchools?latitude=&longitude=
 * Fetches all schools sorted by distance from user's location
 */
const listSchools = async (req, res, next) => {
  try {
    const { latitude: userLat, longitude: userLon } = req.query;

    const [schools] = await pool.execute(
      "SELECT id, name, address, latitude, longitude FROM schools"
    );

    if (schools.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No schools found",
        data: [],
      });
    }

    // Calculate distance for each school and sort
    const schoolsWithDistance = schools
      .map((school) => ({
        ...school,
        distance: calculateDistance(
          userLat,
          userLon,
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    return res.status(200).json({
      success: true,
      message: "Schools fetched successfully",
      count: schoolsWithDistance.length,
      userLocation: { latitude: userLat, longitude: userLon },
      data: schoolsWithDistance,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addSchool, listSchools };
