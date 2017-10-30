var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var glob = require('glob');

//create exportable module
module.exports = function (app, config) {
  
   console.log("Loading Mongoose functionality");
   mongoose.Promise = require('bluebird');
   mongoose.connect(config.db, {useMongoClient: true});
   var db = mongoose.connection;
   db.on('error', function () {
     throw new Error('unable to connect to database at ' + config.db);
   });
  
  
     mongoose.set('debug', true);
     mongoose.connection.once('open', function callback() {
       console.log("Mongoose connected to the database");
     });
    
     //configure middleware
      app.use(function (req, res, next) { 
        console.log('Request from ' + req.connection.remoteAddress, 'info');
        next();
      });
    
  //parse the request bodies
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
      }));
  
// load models
    var models = glob.sync(config.root + '/app/models/*.js');
     models.forEach(function (model) {
       require(model);
     });

//load controllers
   var controllers = glob.sync(config.root + '/app/controllers/*.js');
     controllers.forEach(function (controller) {
      require(controller)(app, config);
     });
  
//indicate where html file is
    app.use(express.static(config.root + '/public'));
    
      app.use(function (req, res) {
        res.type('text/plan');
        res.status(404);
        res.send('404 Not Found'); //called if no other route is found and will send the 404 not found message
        
      });
    
      app.use(function (err, req, res, next) {
      
        console.error(err.stack);
      
        res.type('text/plan');
        res.status(500);
        res.send('500 Sever Error');  
      });
    
      console.log("Starting application");
    
    };
    
  
  
  