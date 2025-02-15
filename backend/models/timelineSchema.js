import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title Required!"],
  },
  description: {
    type: String,
    required: [true, "Description Required!"],
  },
  timeline: {
    from: {
      type: String,
      required: [true, "Start date is required!"], // Ensure start date is required
    },
    to: {
      type: String,
      default: "present", // Default value as "present" for ongoing events
    },
  },
});

export const Timeline = mongoose.model("Timeline", timelineSchema);
