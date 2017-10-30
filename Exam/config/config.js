var path = require('path'),    
rootPath = path.normalize(__dirname + '/..'),    
env = process.env.NODE_ENV || 'development'; //configuration will use development

var config = {  
  development: {
    root: rootPath,
    app: {
      name: 'Exam '
    },
    port: 5000,
    db: 'mongodb://127.0.0.1:27017/exam-dev' //connect to mongo database
  }
  
};

module.exports = config[env]; //exports config



