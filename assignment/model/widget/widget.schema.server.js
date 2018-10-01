var Page = require('../page/page.schema.server');
var mongoose = require('mongoose');

var pageSchema = mongoose.Schema(
  {
    _page:Page,
    widgetType: {type:String, enum:['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
    name: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: String,
    size: String,
    class: String,
    icon: String,
    deletable:Boolean,
    formateed: Boolean,
    text:String,
    dateCreated: {type:Date, default:Date.now}
  },{collection:'widget'});
module.exports  = pageSchema;
