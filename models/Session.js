const { Schema } = require('mongoose')

const sessionSchema = new Schema(
  {
    status: { type: String },
    date: { type: Date, required: true },
    place: { type: String, required: true },
    duration: { type: Number, required: true },
    price: { type: Number },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Child'
      }
    ],
    caregiver: {
      type: Schema.Types.ObjectId,
      ref: 'Caregiver'
    },
    review: {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  },
  { timestamps: true }
)

module.exports = sessionSchema
