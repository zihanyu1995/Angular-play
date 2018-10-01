var PageSchema = require('./page.schema.server');
var mongoose = require('mongoose');
var PageModel = mongoose.model('PageModel',PageSchema);

PageModel.createPage = createPage;
PageModel.findPageById = findPageById;
PageModel.findAllPagesForWebsite = findAllPagesForWebsite;
PageModel.updatePage = updatePage;
PageModel.deletePage = deletePage;

function createPage (page) {

  var us = new PageModel(page);
  us.save(function(err){
    if(err){
      console.log(err);
      return us;
    }else{
      console.log('The new page is saved');
      return us;
    }
  });

}

function findPageById(id) {
  return PageModel.findById(id);
}

function  findAllPagesForWebsite(websiteId) {
  return PageModel.find({_website:websiteId});
}



function updatePage (pId,Page) {
  return PageModel.findById(pId).then(
    function (data) {
      if(data!=null){
        console.log('asdsa')
        data.name = Page.name;
        data.description = Page.description;
      }
      data.save();
      return data;
    }
  );
}

function  deletePage (pId) {
  return  PageModel.remove({_id:pId}).then(
    function (data) {
      console.log(data);
      return data;
    }
  );
}

module.exports = PageModel;
