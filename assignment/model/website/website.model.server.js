var WebSchema = require('./website.schema.server');
var mongoose = require('mongoose');
var WebModel = mongoose.model('WebModel',WebSchema);

WebModel.createWebsiteForUser = createWebsiteForUser;
WebModel.findWebsiteById = findWebsiteById;
WebModel.findAllWebsitesForUser = findAllWebsitesForUser;
WebModel.updateWebsite = updateWebsite;
WebModel.deleteWebsite = deleteWebsite;

function createWebsiteForUser (website) {

  var us = new WebModel(website);
  us.save(function(err){
    if(err){
      console.log(err);
      return us;
    }else{
      console.log('The new website is saved');
      return us;
    }
  });

}

function findWebsiteById(id) {
  return WebModel.findById(id);
}

function  findAllWebsitesForUser(userId) {
  return WebModel.find({_user:userId});
}



function updateWebsite (WebId,Web) {
  return WebModel.findById(WebId).then(
    function (data) {
      if(data!=null){
        data.name = Web.name;
        data.description = Web.description;
      }
      data.save();
      return data;
    }
  );
}

function  deleteWebsite(websiteId) {
  return  WebModel.remove({_id:websiteId}).then(
    function (data) {
      console.log(data);
      return data;
    }
  );
}

module.exports = WebModel;
