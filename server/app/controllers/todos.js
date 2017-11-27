'use strict';

var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    todo = mongoose.model('todo'),
    passportService = require('../../config/passport'),
    passport = require('passport');
var requireAuth = passport.authenticate('jwt', { session: false });   
var requireLogin = passport.authenticate('local', { session: false });

  
    
module.exports = function (app, config) {
app.use('/api', router);

router.get('/todos/:todoId', function(req, res,next){
    logger.log('Get all todo lists','verbose');
    var query = todo.find()
    .sort(req.query.order)
    .exec()
    .then(result => {
        if(result && result.length) {
            res.status(200).json(result);
            } 
        else {
            res.status(404).json({message: "No todo list"});
            }
        })
    .catch(err => {
        return next(err);
        });
    });

router.get('/todos/user/:userId', function(req, res, next){
    logger.log('Get a users todo' + req.params.id, 'verbose');
    todo.findById(req.params.userId)
        .then(todo => {
            if(todo){
                res.status(200).json(todo);
                } 
            else {
                res.status(404).json({message: "No todo found"});
                }
            })
        .catch(error => {
            return next(error);
                });
    }); 

router.post('/todos',function(req,res,next){
    logger.log('Create todo', 'verbose');
    var todos = new todo(req.body);
        todos.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch( err => {
                return next(err);
            });
 
    });

router.put('/todos/:todoId', function(req, res, next){
    logger.log('Update todo' + req.params.id, 'verbose');
    todo.findOneAndUpdate({_id: req.params.userId},         req.body, {new:true, multi:false})
    .then(todo => {
        res.status(200).json(todo);
        })
    .catch(error => {
        return next(error);
        });
    }); 
 
router.delete('/todos/:todoId', function(req, res, next){
    logger.log('Delete todo' + req.params.id, 'verbose');
    todo.remove({ _id: req.params.userId })
    .then(todo => {
        res.status(200).json({msg: "todo Deleted"});

        })
    .catch(error => {
        return next(error);
        });

router.post('/login', function(req, res, next){
    logger.log(req.body);
    var email = req.body.email;
    var password = req.body.password;
    var obj = {'email' : email, 'password' : password};
    res.status(201).json(obj);
    });  
  });
};
