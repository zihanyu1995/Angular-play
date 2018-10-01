var mongoose = require('mongoose');
var Page = require('../page/page.schema.server');
var User = require('../user/user.schema.server');
var websiteSchema = mongoose.Schema(
  {
    _user:User,
    name: String,
    description: String,
    pages : [Page],
    dateCreated: {type:Date, default:Date.now}
  },{collection:'website'});
module.exports  = websiteSchema;
