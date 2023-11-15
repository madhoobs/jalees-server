const { Schema } = require('mongoose')

const reviewSchema = new Schema(
  {
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String },
    guardian: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    session: {
      type: Schema.Types.ObjectId,
      ref: 'Session'
    }
  },
  { timestamps: true }
)

module.exports = reviewSchema
