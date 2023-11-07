const mongoose = require('mongoose')
const userSchema = require('./User')
const caregiverSchema = require('./Caregiver')
const childSchema = require('./Child')
const reviewSchema = require('./Review')
const sessionSchema = require('./Session')

const User = mongoose.model('User', userSchema)
const Caregiver = mongoose.model('Caregiver', caregiverSchema)
const Child = mongoose.model('Child', childSchema)
const Review = mongoose.model('Review', reviewSchema)
const Session = mongoose.model('Session', sessionSchema)

module.exports = {
  User,
  Caregiver,
  Child,
  Review,
  Session
}
