var WidgetSchema = require('./widget.schema.server');
var mongoose = require('mongoose');
var WidgetModel = mongoose.model('WidgetModel',WidgetSchema);

WidgetModel.createWidget = createWidget;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
WidgetModel.updateWidget = updateWidget;
WidgetModel.deleteWidget = deleteWidget;

function createWidget (widget) {

  var us = new WidgetModel(widget);
  us.save(function(err){
    if(err){
      console.log(err);
      return us;
    }else{
      console.log('The new widget is saved');
      console.log(widget);
      return us;
    }
  });

}

function findWidgetById(id) {
  return WidgetModel.findById(id);
}

function  findAllWidgetsForPage(pId) {
  return WidgetModel.find({_page:pId});
}



function updateWidget (widgetId,Widget) {
  return WidgetModel.findById(widgetId).then(
    function (data) {
      if(data!=null){

        if(data.widgetType=="YOUTUBE"){
          data.url= Widget.url;
          data.width = Widget.width;
          if(Widget.hasOwnProperty("name"))
            data.name = Widget.name;
          if(Widget.hasOwnProperty("text"))
            data.text = Widget.text;
        }
        if(data.widgetType=="IMAGE"){
           data.url= Widget.url;
           data.width = Widget.width;
          if(Widget.hasOwnProperty("name"))
            data.name = Widget.name;
          if(Widget.hasOwnProperty("text"))
            data.text = Widget.text;
        }
        if(data.widgetType=="HEADING"){
          data.text= Widget.text;
          data.size = Widget.size;
          if(Widget.hasOwnProperty("name"))
            data.name = Widget.name;
        }

      }
      data.save();
      return data;
    }
  );
}

function  deleteWidget(widgetId) {
  return  WidgetModel.remove({_id:widgetId}).then(
    function (data) {
      console.log(data);
      return data;
    }
  );
}

module.exports = WidgetModel;
