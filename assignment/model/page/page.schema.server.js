var Website = require('../website/website.schema.server')
var mongoose = require('mongoose');
var Widget = require('../widget/widget.schema.server')
var pageSchema = mongoose.Schema(
  {
    _website:Website,
    name: String,
    description: String,
    title: String,
    widgets : [Widget],
    dateCreated: {type:Date, default:Date.now}
  },{collection:'page'});
module.exports  = pageSchema;
