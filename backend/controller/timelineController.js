import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Timeline } from "../models/timelineSchema.js";

// POST: Add a new timeline
export const postTimeline = catchAsyncErrors(async (req, res, next) => {
  const { title, description, from, to } = req.body;
  
  // Handle "to" field as "present" if not provided
  const timelineData = {
    title,
    description,
    timeline: {
      from,
      to: to || "present",  // If "to" is not provided, set it to "present"
    },
  };

  try {
    const newTimeline = await Timeline.create(timelineData);

    res.status(200).json({
      success: true,
      message: "Timeline Added!",
      newTimeline,
    });
  } catch (error) {
    next(error); // Forward errors to the error handler
  }
});

// DELETE: Delete a timeline
export const deleteTimeline = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  
  let timeline = await Timeline.findById(id);
  if (!timeline) {
    return next(new ErrorHandler("Timeline not found", 404));
  }

  await timeline.deleteOne();
  res.status(200).json({
    success: true,
    message: "Timeline Deleted!",
  });
});

// GET: Get all timelines
export const getAllTimelines = catchAsyncErrors(async (req, res, next) => {
  const timelines = await Timeline.find();

  // Check if timelines exist and send response
  if (!timelines || timelines.length === 0) {
    return next(new ErrorHandler("No timelines found", 404));
  }

  res.status(200).json({
    success: true,
    timelines,
  });
});

// GET: Get a specific timeline by ID
export const getTimelineById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  
  const timeline = await Timeline.findById(id);
  if (!timeline) {
    return next(new ErrorHandler("Timeline not found", 404));
  }

  res.status(200).json({
    success: true,
    timeline,
  });
});

// PUT: Update an existing timeline
export const updateTimeline = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, from, to } = req.body;

  const updatedTimeline = await Timeline.findByIdAndUpdate(id, {
    title,
    description,
    timeline: {
      from,
      to: to || "present",  // If "to" is not provided, set it to "present"
    },
  }, { new: true });

  if (!updatedTimeline) {
    return next(new ErrorHandler("Timeline not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Timeline Updated!",
    updatedTimeline,
  });
});
