const { Caregiver } = require('../models')

const CreateCaregiver = async (req, res) => {
  try {
    // Extract inputs from body
    const { name, photo, bio, rate } = req.body
    // Create a new caregiver
    const caregiver = await Caregiver.create({
      name,
      photo,
      bio,
      rate
    })
    res.send(caregiver)
  } catch (error) {
    throw error
  }
}

const GetCaregiver = async (req, res) => {
  try {
    let caregiver = await Caregiver.findById(req.query.id)
    // Send caregiver if found
    return caregiver
      ? res.send(caregiver)
      : res.status(400).send('Caregiver not found!')
  } catch (error) {
    throw error
  }
}

const GetAllCaregivers = async (req, res) => {
  try {
    let caregivers = await Caregiver.find({})
    // Send caregivers if found
    return caregivers
      ? res.send(caregivers)
      : res.status(400).send('Caregivers not found!')
  } catch (error) {
    throw error
  }
}

const UpdateCaregiver = async (req, res) => {
  try {
    const { name, photo, bio, rate } = req.body
    let caregiver = await Caregiver.findOneAndUpdate(
      { _id: req.query.id },
      {
        name,
        photo,
        bio,
        rate
      }
    )
    res.send(caregiver)
  } catch (error) {
    throw error
  }
}

const DeleteCaregiver = async (req, res) => {
  try {
    await Caregiver.findByIdAndDelete(req.query.id)
    res.send({
      msg: 'Caregiver Deleted',
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  CreateCaregiver,
  GetCaregiver,
  GetAllCaregivers,
  UpdateCaregiver,
  DeleteCaregiver
}
