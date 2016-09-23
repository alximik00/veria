var Bookshelf   = require('bookshelf');
var dbConfig = require('../lib/config').database;
var veriaDB     =  Bookshelf.initialize(dbConfig);

module.exports = veriaDB;

