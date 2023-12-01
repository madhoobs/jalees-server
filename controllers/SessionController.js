const { Session, Child, Caregiver } = require('../models')

const GetSession = async (req, res) => {
  try {
    const session = await Session.findById(req.query.id).populate('caregiver')
    // .populate('children')
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
    const { payload } = res.locals
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
    let session = { ...req.body } // include caregiverID and childrenIDs
    session.status = 'pending'
    // Get caregiver hourly rate
    let caregiver = await Caregiver.findById(session.caregiver)
    session.price = Math.round(session.duration * caregiver.rate * 10) / 10 // Round price to one decimal
    // Create new session
    let newSession = await Session.create(session)
    // Add session to children
    session.children.forEach(async (child) => {
      let sessionChild = await Child.findById(child)
      sessionChild.sessions.push(newSession._id)
      sessionChild.save().catch((err) => {
        console.log('Adding session to child failed. ' + err)
      })
    })
    res.send(newSession)
  } catch (error) {
    throw error
  }
}

const CreateGuestSession = async (req, res) => {
  try {
    // This api is to create a session request without logging in
    let session = { ...req.body } // include caregiverID and childrenIDs
    session.status = 'pending'
    // Get caregiver hourly rate
    let caregiver = await Caregiver.findById(session.caregiver)
    session.price = Math.round(session.duration * caregiver.rate * 10) / 10 // Round price to one decimal
    // Create new session
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
    // Delete session from all childs?
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
  DeleteSession,
  CreateGuestSession
}
