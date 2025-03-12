import School from '../models/schoolModel.js';
import { calculateDistance } from '../utils/distanceCal.js';

// POST /addSchool - Add a new school
export const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const school = await School.create({ name, address, latitude, longitude });
    res.status(201).json({ message: 'School added successfully', id: school.id });
  } catch (error) {
    res.status(500).json({ error: 'Error adding school' });
  }
};

// GET /listSchools - Get a list of schools sorted by distance
export const listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const schools = await School.findAll();
    
    const schoolsWithDistance = schools.map((school) => {
      const distance = calculateDistance(latitude, longitude, school.latitude, school.longitude); // Use the helper function
      return { ...school.toJSON(), distance };
    });

    // Sort the schools by distance
    res.status(200).json(schoolsWithDistance.sort((a, b) => a.distance - b.distance));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching schools' });
  }
};
