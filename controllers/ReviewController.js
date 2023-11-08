const { Review, Session, Child } = require('../models')

const AddReview = async (req, res) => {
  try {
    let review = { ...req.body }
    // Get UserID from payload and add it to the new review
    const { payload } = res.locals
    review.user = payload.id
    // Add SessionID in the new review
    review.session = req.body.sessionID
    let newReview = await Review.create(review)
    res.send(newReview)
  } catch (error) {
    throw error
  }
}

const GetReview = async (req, res) => {
  try {
    let reviews = await Review.findById(req.query.id).populate(session)
    return reviews
      ? res.send(reviews)
      : res.status(400).send('Reviews not found!')
  } catch (error) {
    throw error
  }
}

const GetUserReviews = async (req, res) => {
  try {
    let reviews = await Review.find({ guardian: req.query.uid })
    return reviews
      ? res.send(reviews)
      : res.status(400).send('Reviews not found!')
  } catch (error) {
    throw error
  }
}

const GetSessionReview = async (req, res) => {
  try {
    let reviews = await Review.find({ session: req.query.sid })
    return reviews
      ? res.send(reviews)
      : res.status(400).send('Review not found!')
  } catch (error) {
    throw error
  }
}

const GetCaregiverReviews = async (req, res) => {
  try {
    let sessions = await Session.find({ caregiver: req.query.cid })
    if (sessions) {
      let reviews = await Review.find({ session: sessions._id })
      return reviews
        ? res.send(reviews)
        : res.status(400).send('Reviews not found!')
    }
  } catch (error) {
    throw error
  }
}

const EditReview = async (req, res) => {
  try {
    const { payload } = res.locals
    const review = await Review.findOneAndUpdate(
      { _id: req.query.id, guardian: payload.id },
      req.body,
      {
        new: true
      }
    )
    res.send(review)
  } catch (error) {
    throw error
  }
}

const DeleteReview = async (req, res) => {
  try {
    const { payload } = res.locals
    let children = await Child.find({ guardian: payload.id })
    await Review.findOneAndDelete({ _id: req.query.id, children: children })
    res.send({
      msg: 'Review Deleted',
      payload: req.query.id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetReview,
  GetUserReviews,
  GetSessionReview,
  GetCaregiverReviews,
  AddReview,
  EditReview,
  DeleteReview
}
