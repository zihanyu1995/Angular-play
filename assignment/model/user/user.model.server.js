var UserSchema = require('./user.schema.server');
var mongoose = require('mongoose');
var UserModel = mongoose.model('UserModel',UserSchema);
UserModel.createUser = createUser;
UserModel.findUserById = findUserById;
UserModel.findUserByUsername = findUserByUsername;
UserModel.findUserByCreadentials = findUserByCreadentials;
UserModel.updateUser = updateUser;
UserModel.deleteUser = deleteUser;

function createUser (user) {
  var us = new UserModel(user);
  return us.save();

}

function findUserById(id) {
  return UserModel.findById(id);
}

function  findUserByUsername(username) {
  return UserModel.findOne({username:username});
}

function  findUserByCreadentials(username,password) {
  return UserModel.findOne({username:username,password:password});
}

function updateUser (userId,user) {
 return UserModel.findById(userId).then(
    function (data) {
      if(data!=null){
        data.username = user.username;
        data.lastName = user.lastName;
        data.firstName = user.firstName;
        data.email=user.email;
      }
      data.save();
      return data;
    }
  );
}

function  deleteUser(userId) {
 return  UserModel.remove({_id:userId}).then(
   function (data) {
     console.log(data);
     return data;
   }
 );
}

module.exports = UserModel;
