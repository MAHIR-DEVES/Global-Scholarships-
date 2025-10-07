import User from '../models/userModel.js';

// @desc   Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Create a new user
export const createUser = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    phone,
    country,
    educationLevel,
    fieldOfStudy,
    profileImage,
    bio,
    isVerified,
  } = req.body;

  try {
    const user = new User({
      name,
      email,
      password,
      role,
      phone,
      country,
      educationLevel,
      fieldOfStudy,
      profileImage,
      bio,
      isVerified,
    });

    await user.save();
    res.status(201).json({
      success: true,
      message: 'User created successfully!',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
