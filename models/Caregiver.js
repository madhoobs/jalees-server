const { Schema } = require('mongoose')

const caregiverSchema = new Schema(
  {
    name: { type: String, required: true },
    photo: { type: String, required: true },
    bio: { type: String, required: true },
    rate: { type: Number, required: true }
  },
  { timestamps: true }
)

module.exports = caregiverSchema
