
var express = require('express');
var router = express.Router();
var logger = require('../../config/logger');
var mongoose = require('mongoose');
var User = mongoose.model('Users');


//module exports to import content
module.exports = function (app, config) {
	app.use('/api', router);
  
    router.get('/users/:userId', function(req, res, next){
        logger.log('Get all users', 'verbose');
        var query = User.find()
        .sort(req.query.order)
        .exec()
        .then(result => {
             if(result && result.length) {
            res.status(200).json(result);
        } else {
            res.status(404).json({message: "No users"});
        }
        })
        .catch(err => {
          return next(err);
        });
    }); 
    
    router.get('/users/:userId', function (req, res, next) {
            logger.log('Get users', 'verbose');
            var query = User.find()
              .sort(req.query.order)
              .exec()
              .then(result => {
                   if(result && result.length) {
                  res.status(200).json(result);
              } else {
                  res.status(404).json({message: "No users"});
              }
              })
              .catch(err => {
                return next(err);
              });
          }); 
    
    router.post('/users/:userId', function (req, res, next) {
        logger.log('Create User', 'verbose');
        var user = new User(req.body);
        user.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            return next(err);
        });
      });
    
    
    
    router.put('/users/:userId', function(req, res, next){
                logger.log('Update user ' + req.params.userId, 'verbose');
                User.findOneAndUpdate({_id: req.params.userId}, 		req.body, {new:true, multi:false})
                    .then(user => {
                        res.status(200).json(user);
                    })
                    .catch(error => {
                        return next(error);
                    });
            }); 
            
    
    router.delete('/users/:userId', function(req, res, next){
                logger.log('Delete user ' + req.params.userId, 'verbose');
                User.remove({ _id: req.params.userId })
                    .then(user => {
                        res.status(200).json({msg: "User Deleted"});
                    })
                    .catch(error => {
                        return next(error);
                    });
            });
    
    
    router.post('/login', function(req, res, next){
        console.log(req.body);
        var email = req.body.email;
        var password = req.body.password;
    
        var obj = {'email' : email, 'password' : password};
      res.status(201).json(obj);
    });
    };