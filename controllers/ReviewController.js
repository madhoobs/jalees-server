const { Review } = require('../models')

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
    let reviews = await Review.findById(req.query.id)
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

const GetSessionReviews = async (req, res) => {
  try {
    let reviews = await Review.find({ session: req.query.sid })
    return reviews
      ? res.send(reviews)
      : res.status(400).send('Reviews not found!')
  } catch (error) {
    throw error
  }
}

const EditReview = async (req, res) => {
  try {
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
    await Review.findOneAndDelete({ _id: req.query.id, guardian: payload.id })
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
  GetSessionReviews,
  AddReview,
  EditReview,
  DeleteReview
}
