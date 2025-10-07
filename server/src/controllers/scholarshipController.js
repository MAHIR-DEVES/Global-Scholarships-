import Scholarship from '../models/Scholarship.js';

// 🟢 Create Scholarship
export const createScholarship = async (req, res) => {
  try {
    const newScholarship = new Scholarship(req.body);
    const savedScholarship = await newScholarship.save();
    res.status(201).json({
      success: true,
      message: 'Scholarship created successfully!',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🟢 Get All Scholarships
export const getAllScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.status(200).json(scholarships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Get Single Scholarship by ID
export const getScholarshipById = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    res.status(200).json(scholarship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Update Scholarship
export const updateScholarship = async (req, res) => {
  try {
    const updatedScholarship = await Scholarship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedScholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    res.status(201).json({
      success: true,
      message: 'Scholarship Updated successfully!',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Delete Scholarship
export const deleteScholarship = async (req, res) => {
  try {
    const deletedScholarship = await Scholarship.findByIdAndDelete(
      req.params.id
    );
    if (!deletedScholarship) {
      return res.status(404).json({ message: 'Scholarship not found' });
    }
    res.status(200).json({ message: 'Scholarship deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
