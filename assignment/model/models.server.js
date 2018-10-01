var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/cs5610';
if (process.env.NODE_ENV === 'production') {
  dbURI = 'mongodb://yzh:95263yzh@ds229468.mlab.com:29468/heroku_s38x2sp0';
}
var db = mongoose.connect(dbURI);
module.exports = db;
