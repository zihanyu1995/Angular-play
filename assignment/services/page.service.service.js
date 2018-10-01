var PageModel = require('../model/page/page.model.server');

module.exports = function(app) {

  //var bodyParser = require('body-parser');
  app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
  app.post('/api/website/:websiteId/page',createPage);
  app.get('/api/page/:pageId', findPageById);
  app.delete('/api/page/:pageId', deletePage);
  app.put('/api/page/:pageId', updatePage);

  function createPage (req, res) {
    res.status(200).send(PageModel.createPage(req.body));
  }

  function findPageById(req,res) {
    var pId = req.params['pageId'];
    PageModel.findPageById(pId).then(
      function (data) {
        res.status(200).send(data);
      }
    );

  }

  function  findAllPagesForWebsite(req, res) {
    var wId = req.params['websiteId'];
    PageModel.findAllPagesForWebsite(wId).then(
      function (data) {
        res.status(200).send(data);
      }
    );
  }

  function deletePage(req,res) {
    PageModel.deletePage(req.params['pageId']).then(
      function (data) {
        console.log(data+'000');
        res.status(200).send();
      }
    );
  }

  function  updatePage(req, res) {
    var pId = req.params['pageId'];
    PageModel.updatePage(pId,req.body).then(
      function (data) {
        console.log(data);
        if(data)
          res.status(200).send(data);
        else
          res.status(500).send();
      }
    );

  }


};



