const { Child } = require('../models')

const CreateChild = async (req, res) => {
  try {
    const { payload } = res.locals
    let child = { ...req.body }
    child.guardian = payload.id
    let newChild = await Child.create(child)
    res.send(newChild)
  } catch (error) {
    throw error
  }
}

const GetChild = async (req, res) => {
  try {
    const { payload } = res.locals
    let child = await Child.findById({
      _id: req.query.id,
      guardian: payload.id
    }).populate('sessions')
    // Send child if found
    return child ? res.send(child) : res.status(400).send('Child not found!')
  } catch (error) {
    throw error
  }
}

const GetChildren = async (req, res) => {
  try {
    const { payload } = res.locals
    let children = await Child.find({ guardian: payload.id })
    // Send children if found
    return children
      ? res.send(children)
      : res.status(400).send('Children not found!')
  } catch (error) {
    throw error
  }
}

const UpdateChild = async (req, res) => {
  try {
    const { name, age, relationship, notes } = req.body
    let child = await Child.findOneAndUpdate(
      { _id: req.query.id },
      {
        name,
        age,
        relationship,
        notes
      }
    )
    res.send(child)
  } catch (error) {
    throw error
  }
}

const DeleteChild = async (req, res) => {
  try {
    const { payload } = res.locals
    await Child.findOneAndDelete({
      _id: req.query.id,
      guardian: payload.id
    })
    res.send({
      msg: 'Child Removed!',
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  CreateChild,
  GetChild,
  GetChildren,
  UpdateChild,
  DeleteChild
}
