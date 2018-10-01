var Website = require('../website/website.schema.server')
var mongoose = require('mongoose');

var userSchema = mongoose.Schema(
{
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  websites :[Website],
  dateCreated: {type:Date, default:Date.now}
},{collection:'user'});

module.exports  = userSchema;
