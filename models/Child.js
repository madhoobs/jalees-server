const { Schema } = require('mongoose')

const childSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    relationship: { type: String, required: true },
    notes: { type: String },
    guardian: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    sessions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Session'
      }
    ]
  },
  { timestamps: true }
)

module.exports = childSchema
