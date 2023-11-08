const { Schema } = require('mongoose')

const sessionSchema = new Schema(
  {
    status: { type: String },
    date: { type: Date, required: true },
    place: { type: String, required: true },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Child'
      }
    ],
    caregiver: {
      type: Schema.Types.ObjectId,
      ref: 'Caregiver'
    }
  },
  { timestamps: true }
)

module.exports = sessionSchema
