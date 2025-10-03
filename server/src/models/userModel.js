import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    // Basic info
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },

    // Profile info
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
    },
    phone: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
    educationLevel: {
      type: String,
      enum: ['High School', 'Undergraduate', 'Postgraduate', 'PhD', 'Other'],
      default: 'Undergraduate',
    },
    fieldOfStudy: {
      type: String,
      default: '',
    },

    // Extra features
    profileImage: {
      type: String, // URL
      default: '',
    },
    bio: {
      type: String,
      maxlength: 300,
    },

    // Account management
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
