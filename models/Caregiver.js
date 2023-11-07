const { Schema } = require('mongoose')

const caregiverSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    photo: { type: String },
    bio: { type: String, required: true },
    rate: { type: Number, required: true }
  },
  { timestamps: true }
)

module.exports = caregiverSchema
