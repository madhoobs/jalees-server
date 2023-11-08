const { Session, Child } = require('../models')

const GetSession = async (req, res) => {
  try {
    const session = await Session.findById(req.query.id)
      .populate('children')
      .populate('caregiver')
    res.send(session)
  } catch (error) {
    throw error
  }
}

const GetChildSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ child: req.query.id })
      .populate('children')
      .populate('caregiver')
    res.send(sessions)
  } catch (error) {
    throw error
  }
}

const GetChildrenSessions = async (req, res) => {
  try {
    let children = await Child.find({ guardian: payload.id })
    const sessions = await Session.find({ child: children._id })
      .populate('children')
      .populate('caregiver')
    res.send(sessions)
  } catch (error) {
    throw error
  }
}

const GetCaregiverSessions = async (req, res) => {
  try {
    const session = await Session.find({ caregiver: req.query.cid })
      .populate('children')
      .populate('caregiver')
    res.send(session)
  } catch (error) {
    throw error
  }
}

const CreateSession = async (req, res) => {
  try {
    let session = { ...req.body } // include caregiverID
    session.status = 'pending'
    let newSession = await Session.create(session)
    res.send(newSession)
  } catch (error) {
    throw error
  }
}

const UpdateSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.query.sid, req.body, {
      new: true
    })
    res.send(session)
  } catch (error) {
    throw error
  }
}

const DeleteSession = async (req, res) => {
  try {
    await Session.deleteOne({ _id: req.params.session_id })
    res.send({
      msg: 'Session Deleted',
      payload: req.params.session_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetSession,
  GetChildSessions,
  GetChildrenSessions,
  GetCaregiverSessions,
  CreateSession,
  UpdateSession,
  DeleteSession
}
