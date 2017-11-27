
 'use strict';
    
var express = require('express'),
   router = express.Router(),
   logger = require('../../config/logger'),
   mongoose = require('mongoose'),
   User = mongoose.model('Users'),
   passportService = require('../../config/passport'),
   passport = require('passport');
    var requireAuth = passport.authenticate('jwt', { session: false });   
    var requireLogin = passport.authenticate('local', { session: false });
   
 
module.exports = function (app, config) {
app.use('/api', router);

router.route('/users').get(function(req, res, next){
    logger.log('Get all users', 'verbose');

});


router.route('/users', function(req, res,next){
        logger.log('Get all users','verbose');    
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
            .catch(error => {
              return next(error);
            });
        });

router.get('/users/:userId', function(req, res, next){    
            logger.log('Get user' + req.params.id, 'verbose');
            User.findById(req.params.userId)
                        .then(User => {
                           if(User){
                                res.status(200).json(User);
                                    } 
                            else {
                                res.status(404).json({message: "No user found"});
                                }
                        })

                        .catch(error => {
                            return next(error);
                        });    
                }); 

router.post('/users',function(req,res,next){    
    logger.log('Create User', 'verbose');
    var users = new User(req.body);
        users.save()
            .then(result => {
                res.status(201).json(result);
                })
            .catch( err => {
               return next(err);
                });
    });



router.put('/users/password/:userId', function(req, res, next){
	logger.log('Update user ' + req.params.userId, 'verbose');

	User.findById(req.params.userId)
		.exec()
		.then(function (user) {
			if (req.body.password !== undefined) {
				user.password = req.body.password;
			}

			user.save()
				.then(function (user) {
					res.status(200).json(user);
				})
				.catch(function (err) {
					return next(err);
				});
		})
		.catch(function (err) {
			return next(err);
		});
});

router.put('/users/:userId', function(req, res, next){
    logger.log('Update user' + req.params.id, 'verbose');
    User.findOneAndUpdate({_id: req.params.userId}, req.body, {new:true, multi:false})
        .then(User => {
            res.status(200).json(User);
            })
        .catch(error => {
            return next(error);
            });
    }); 
    
router.delete('/users/:userId', function(req, res, next){
    logger.log('Delete user' + req.params.id, 'verbose');
    User.remove({ _id: req.params.userId })
        .then(User => {
            res.status(200).json({msg: "User Deleted"});
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