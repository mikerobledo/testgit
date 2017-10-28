'use strict';

var path = require('path'),    
    rootPath = path.normalize(__dirname + '/..'),    
    env = process.env.NODE_ENV || 'development';

var config = {  
  development: {
    root: rootPath,
    app: {
      name: 'Todos'},
    port: 5000,
    db: 'mongodb://127.0.0.1/todo-dev'
},  

 test: {
  root: rootPath,
  app: { name: 'ToDo'},
  port: 4000,
  db: 'mongodb://127.0.0.1/todo-dev'
  

},

 production: {    
  root: rootPath,    
  app: { name: 'ToDo' },    
  port: 80, 
  db: 'mongodb://127.0.0.1/todo-dev'
  }
};

module.exports = config[env];


