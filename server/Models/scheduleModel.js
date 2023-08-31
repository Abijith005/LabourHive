import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "user_id is required"],
  },

  weekSchedule: {
    type: [
      {
        date: {
          type: Date,
          required: [true, "Date is required"],
        },
        hire_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: false,
        },
      },
    ],
    required: [true, "week schedule is required"],
    validate: {
      validator: (array) => {
        return array.length === 7;
      },
      message: "weekSchedule should contain exactly 7 elements",
    },
  },
});



scheduleSchema.pre("save", function (next) {
  if (this.weekSchedule.length >= 7) {
    this.weekSchedule.shift();
  }
  next();
});

const scheduleModel = mongoose.model("schedule", scheduleSchema);
export default scheduleModel;
