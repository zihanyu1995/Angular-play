var WebModel = require('../model/website/website.model.server');

module.exports = function(app) {


  //var bodyParser = require('body-parser');
  app.get('/api/user/:userId/website', findAllWebsitesForUser);
  app.post('/api/user/:userId/website',createWebsite);
  app.get('/api/website/:websiteId', findWebsiteById);
  app.delete('/api/website/:websiteId', deleteWebsite);
  app.put('/api/website/:websiteId', updateWebsite);

  function createWebsite (req, res) {

    res.status(200).send(WebModel.createWebsiteForUser(req.body));
  }

  function findWebsiteById(req,res) {
    var wId = req.params['websiteId'];
    WebModel.findWebsiteById(wId).then(
      function (data) {
        res.status(200).send(data);
      }
    );
  }

  function  findAllWebsitesForUser(req, res) {
    var userId = req.params['userId'];
    WebModel.findAllWebsitesForUser(userId).then(
      function (data) {
        res.status(200).send(data);
      }
    );
  }

  function deleteWebsite(req,res) {
    WebModel.deleteWebsite(req.params['websiteId']).then(
      function (data) {
        console.log(data+'000');
        res.status(200).send();
      }
    );
  }

  function  updateWebsite(req, res) {

    var websiteId = req.params['websiteId'];
    WebModel.updateWebsite(websiteId,req.body).then(
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



