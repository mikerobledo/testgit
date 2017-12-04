
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    todo = mongoose.model('todo'),
    passportService = require('../../config/passport'),
    passport = require('passport'),
    multer = require('multer'),
    mkdirp = require('mkdirp');
var requireAuth = passport.authenticate('jwt', { session: false });   
var requireLogin = passport.authenticate('local', { session: false });

  
    
module.exports = function (app, config) {
app.use('/api', router);

router.get('/todos', function(req, res,next){
    logger.log('Get all todos','verbose');
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

router.get('/todos/:todoId', function(req, res, next){
        logger.log('Get Todo ' + req.params.todoId, 'verbose');
                todo.findById(req.params.todoId)
                    .then(todo => {
                        if(todo){
                            res.status(200).json(todo);
                        } else {
                            res.status(404).json({message: "No Todo found"});
                        }
                    })
                    .catch(error => {
                        return next(error);
                    });
            });       
    
router.get('/todos/user/:userId', function(req, res, next){
        logger.log('Get todo ' + req.params.userId, 'verbose');
            todo.find({userId: req.params.userId})
              .then(todo => {
                if(todo){
                    res.status(200).json(todo);
                } else {
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
    todo.findOneAndUpdate({_id: req.params.todoId},
    req.body, {new:true, multi:false})
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
    });

var storage = multer.diskStorage({
	destination: function (req, file, cb) {      
	  	var path = config.uploads + req.params.userId + "/";
		mkdirp(path, function(err) {
			if(err){
				res.status(500).json(err);
			} else {
				cb(null, path);
			}
		});
	},
	filename: function (req, file, cb) {
		let fileName = file.originalname.split('.');   
		cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
	}
  });

var upload = multer({ storage: storage });
  router.post('/todos/upload/:userId/:todoId', upload.any(), function(req, res, next){
      logger.log('Upload file for todo ' + req.params.todoId + ' and ' + req.params.userId, 'verbose');
      
      todo.findById(req.params.todoId, function(err, todo){
          if(err){ 
              return next(err);
          } else {     
              if(req.files){
                     todo.file = {
                            filename : req.files[0].filename,
                            originalName : req.files[0].originalname,
                            dateUploaded : new Date()
        
                  };
              }           
              todo.save()
                  .then(todo => {
                      res.status(200).json(todo);
                  })
                  .catch(error => {
                      return next(error);
                  });
          }
      });
  });
  
    
};
