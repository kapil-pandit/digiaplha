const models = require('../models')

const getAllData = async () => {
  let response = await models.sequelize.query('SELECT * FROM "Users"')
  return response[1].rows;
}

const getSingleData = async (id) => {
  let response = await models.sequelize.query(`SELECT * FROM "Users" WHERE (id= ${id} AND isdeleted != true)` )
  return response[1].rows
}

const addData = async (data) => {
  const {firstName,lastName, email, phone} = data;
  let q = `INSERT INTO "Users" (firstname,lastname, email, phone) VALUES ('${firstName}', '${lastName}','${email}','${phone}') RETURNING *;`;
  let resp = await models.sequelize.query(q);
  return resp[1].rows;
}
const updateData = async (id, data) => {
  const {firstName,lastName, email, phone} = data;
  let response = await models.sequelize.query(
    `UPDATE "Users" SET firstname = '${firstName}', lastname = '${lastName}', email = '${email}', phone = '${phone}'  WHERE id = '${id}' `
  )
  return response;
}
const deleteData = async (id) => {
  let response = await models.sequelize.query(`UPDATE "Users" SET isdeleted = true WHERE id = '${id}' `)
  return response;
}

module.exports = {
  getAllData,
  getSingleData,
  addData,
  updateData,
  deleteData,
}
