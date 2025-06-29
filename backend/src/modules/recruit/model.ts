import mongoose from "mongoose";

const RecruitSchema = new mongoose.Schema(
  {
    applicantId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    birthDate: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    address: { type: String, required: true },
    course: { type: String, required: true },
    eligibility: { type: String, required: true },
    phoneNumber: {
      type: String,
      required: true,
    },
    images: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

RecruitSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Recruit = mongoose.model("Recruit", RecruitSchema);

export default Recruit;
