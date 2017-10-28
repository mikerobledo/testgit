var path = require('path'),    
rootPath = path.normalize(__dirname + '/..'),    
env = process.env.NODE_ENV || 'development';

var config = {  
  development: {
    root: rootPath,
    app: {
      name: 'Exam '
    },
    port: 5000,
    db: 'mongodb://127.0.0.2/exam-dev'
  }
};
module.exports = config[env];



