import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ['Diploma', 'Bachelor', 'Master', 'PhD'],
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  tuitionFee: {
    type: String,
    required: true,
  },
  eligibility: {
    type: String,
    required: true,
  },
  applicationDeadline: {
    type: String,
    required: true,
  },
  languageRequirement: {
    type: String,
  },
  additionalInfo: {
    type: String,
  },
});

const scholarshipSchema = new mongoose.Schema(
  {
    universityName: {
      type: String,
      required: [true, 'University name is required'],
    },
    country: {
      type: String,
      enum: ['China', 'Malaysia'],
      required: [true, 'Country is required'],
    },
    universityLogo: {
      type: String, // Image URL
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    programs: [programSchema],
    website: {
      type: String,
    },
    contactEmail: {
      type: String,
    },
  },
  { timestamps: true }
);

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

export default Scholarship;
