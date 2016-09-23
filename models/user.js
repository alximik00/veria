var veriaBookshelf = require('./database');

var user = veriaBookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true
});

var users = veriaBookshelf.Collection.extend({
  model: user
});

exports.user = user;
exports.users = users;