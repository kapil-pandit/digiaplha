const message = require('../config/messages')
const dataValidator = require('../helper/dataValidator')
const models = require('../database/models')
const {
  getAllData,
  getSingleData,
  addData,
  updateData,
  deleteData,
} = require('../database/operations/user')
// const console = require('../logger')

const get_data = async (req, res) => {
  try {
    console.log("Test Called::::::");
    let response = await getAllData()
    return _handleResponse(req, res, null, response)
  } catch (e) {
    return _handleResponse(req, res, e)
  }
}

const getSingleUSer = async (req, res) => {
  try {
    let id = req.params.id
    let response = await getSingleData(id)
    return _handleResponse(req, res, null, response)
  } catch (e) {
    return _handleResponse(req, res, e)
  }
}

const register = async (req, res) => {
  try {
    const updateObj = await dataValidator.validateUserObj(req.body)
    let response = await addData(updateObj)
    return _handleResponse(req, res, null, response)
  } catch (e) {
    console.log(e.message)
    return _handleResponse(req, res, e)
  }
}

const update_data = async (req, res) => {
  try {
    let id = req.params.id
    const updateObj = await dataValidator.validateUserObj(req.body)
    let response = await updateData(id, updateObj)
    console.log(response)
    return _handleResponse(req, res, null, 'Success')
  } catch (e) {
    console.log(e.message)
    return _handleResponse(req, res, e)
  }
}

const delete_data = async (req, res) => {
  try {
    let id = req.params.id
    await deleteData(id)
    return _handleResponse(req, res, null, 'Deleted')
  } catch (e) {
    console.log(e.message)
    return _handleResponse(req, res, e)
  }
}

module.exports = {
  get_data,
  getSingleUSer,
  register,
  update_data,
  delete_data,
}
