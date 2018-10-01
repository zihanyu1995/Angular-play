var WidgetModel = require('../model/widget/widget.model.server');

module.exports = function(app) {


  app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
  app.post('/api/page/:pageId/widget',createWidget);
  app.get('/api/widget/:widgetId', findWidgetById);
  app.delete('/api/widget/:widgetId', deleteWidget);
  app.put('/api/widget/:widgetId', updateWidget);

  function createWidget (req, res) {

    res.status(200).send(WidgetModel.createWidget(req.body));
  }

  function findWidgetById(req,res) {
    var wId = req.params['widgetId'];

    WidgetModel.findWidgetById(wId).then(
      function (data) {
        res.status(200).send(data);
      }
    );
  }

  function  findAllWidgetsForPage(req, res) {
    var pId = req.params['pageId'];
    WidgetModel.findAllWidgetsForPage(pId).then(
      function (data) {
        res.status(200).send(data);
      }
    );
  }

  function deleteWidget(req,res) {
    WidgetModel.deleteWidget(req.params['widgetId']).then(
      function (data) {
        console.log(data+'000');
        res.status(200).send();
      }
    );
  }

  function  updateWidget(req, res) {
    var wId = req.params['widgetId'];
    WidgetModel.updateWidget(wId,req.body).then(
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



