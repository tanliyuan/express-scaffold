var User = require('../models/user');

exports.getUserByLoginName = function (loginName, callback) {
    User.findOne({'name': new RegExp('^'+loginName+'$', "i")}, callback);
};

exports.newAndSave = function (name, age, callback) {
    var user         = new User();
    user.name = name;
    user.age = age;
  
    user.save(callback);
  };