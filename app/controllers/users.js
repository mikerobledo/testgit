'use strict'

var express = require('express'),
  router = express.Router(),
  logger = require('../../config/logger');

//module exports to import content
module.exports = function (app, config) {
    app.use('/api', router);

router.get('/users', function(req, res, next){
    logger.log('Get all users', 'verbose');
res.status(200).json({message: 'Get all users'});
});


router.get('/users/:userid', function(req, res, next){
    logger.log('Get user ' + req.params.userid, 'verbose');

res.status(200).json({message: 'Get user ' + req.params.userid});
});

router.post('/users/:userid', function(req,res,next){
    logger.log('Create user', 'verbose');
    res.status(201).json({message: 'User created'});

});

router.put('/users/:userid', function(req, res, next){
    logger.log('Update user ' + req.params.userid, 'verbose');

res.status(200).json({message: 'Update user ' + req.params.userid});
});

router.delete('/users/:userid', function(req, res, next){
    logger.log('Delete user ' + req.params.userid, 'verbose');

res.status(200).json({message: 'Delete user ' + req.params.userid});
});

router.post('/login', function(req, res, next){
    logger.log(req.body);
    var email = req.body.email
    var password = req.body.password;

    var obj = {'email' : email, 'password' : password};
  res.status(201).json(obj);
});


};