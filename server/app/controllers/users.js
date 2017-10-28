

var express = require('express'),
  router = express.Router(),
  logger = require('../../config/logger'),
  mongoose = require('mongoose'),
  User = mongoose.model('Users');


//module exports to import content
module.exports = function (app, config) {
	app.use('/api', router);

//router.get('/users', function(req, res, next){
    //logger.log('Get all users', 'verbose');

    router.get('/users', function (req, res, next) {
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

router.post('/users', function (req, res, next) {
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

router.get('/users/:userid', function(req, res, next){
    logger.log('Get user ' + req.params.userid, 'verbose');

    router.get('/users/:userId', function(req, res, next){
                logger.log('Get user ' + req.params.userId, 'verbose');
                User.findById(req.params.userId)
                    .then(user => {
                        if(user){
                            res.status(200).json(user);
                        } else {
                            res.status(404).json({message: "No user found"});
                        }
                    })
                    .catch(error => {
                        return next(error);
                    });
            }); 
        
});




router.post('/users/:userid', function(req,res,next){
    logger.log('Create user', 'verbose');
    res.status(201).json({message: 'User created'});

    

});

router.put('/users/:userid', function(req, res, next){
    logger.log('Update user ' + req.params.userid, 'verbose');

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
        
        
});

router.delete('/users/:userid', function(req, res, next){
    logger.log('Delete user ' + req.params.userid, 'verbose');

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
        });

router.post('/login', function(req, res, next){
    console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;

    var obj = {'email' : email, 'password' : password};
  res.status(201).json(obj);
});
};