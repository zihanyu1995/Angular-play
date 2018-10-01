module.exports = function(app) {
  var db = require("./model/models.server");
  require("./services/user.service.service")(app);
  require("./services/website.service.service")(app);
  require("./services/page.service.service")(app);
  require("./services/widget.service.service")(app);
};
