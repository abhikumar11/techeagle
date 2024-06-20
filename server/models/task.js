const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Ongoing', 'Paused', 'Completed'], default: 'Pending' },
  startTime: { type: Date },
  endTime: { type: Date },
  duration: { type: Number, default: 0 },
  history: [
    {
      action: String,
      timestamp: Date
    }
  ]
});
module.exports = mongoose.model("Task", taskSchema);
