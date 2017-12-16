var express = require('express'),
router = express.Router(),
logger = require('../../config/logger'),
mongoose = require('mongoose'),
Pic = mongoose.model('pics'),

passportService = require('../../config/passport'),
passport = require('passport'),

multer = require('multer'),
mkdirp = require('mkdirp');

var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
app.use('/api', router);

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

router.get('/pics/user/:userId',
     function (req, res, next){
    logger.log('Get pics for a user', 'verbose');

    var query = Pic.find ({userId: req.params.picId})
    .sort (req.query.order)
    .exec ()
    .then(result => {
        if(result && result.length){
            res.status(200).json (result);
        } else {
            res.status (404).json ({message:"No Pictures"});
        }
    })
    .catch(err => {
        return next (err);
    });
});


router.get('/pics', 
     function (req, res, next){
    logger.log('Get User','verbose');

    Pic.find()
                .then(pic => {
                    if(pic){
                        res.status(200).json(pic);
                    } else {
                        res.status(404).json({message: "No user found"});
                    }
                })
                .catch(error => {
                    return next(error);
                });
        });  

router.get('/pics/:picId',
    function (req, res, next){
    logger.log('Get Pic'+ req.params.picId, 'verbose');

    Pic.find({Id:req.params.picId})
                .then(pic => {
                    if(pic){
                        res.status(200).json(pic);
                    } else {
                        res.status(404).json({message: "No pic found"});
                    }
                })
                .catch(error => {
                    return next(error);
                });
        });  

router.post('/pics', function(req, res, next){
    logger.log('Create a pic', 'verbose');

    var pic = new Pic(req.body);
    pic.save()
   .then(result => {
       res.status(201).json(result);
   })
   .catch( err => {
      return next(err);
   });
});  

router.put('/pics/:picId',
 function (req, res, next){
    logger.log('Update pics with id picid'+ req.params.picId, 'verbose');

    
    Pic.findOneAndUpdate({_id: req.params.picId}, 		
        req.body, {new:true, multi:false})
            .then(pic => {
                res.status(200).json(pic);
            })
            .catch(error => {
                return next(error);
            });
});


router.delete('/pics/:picId',
    function (req, res, next){
    logger.log('Delete pic with id picid'+ req.params.picId, 'verbose');

    Pic.remove({ _id: req.params.picId })
            .then(pic => {
                res.status(200).json({msg: "Pic Deleted"});
            })
            .catch(error => {
                return next(error);
            });
});

var upload = multer({ storage: storage });

router.post('/pics/upload/:userId/:picId', upload.any(), function(req, res, next){
    logger.log('Upload pics for gallery ' + req.params.picId + ' and ' + req.params.userId, 'verbose');
    
    Pic.findById(req.params.picId, function(err, pic){
        if(err){ 
            return next(err);
        } else {     
            if(req.files){
                pic.file = {
                    fileName : req.files[0].filename,
                    originalName : req.files[0].originalname,
                    dateUploaded : new Date()
                };
            }           
            pic.save()
                .then(pic => {
                    res.status(200).json(pic);
                })
                .catch(error => {
                    return next(error);
                });
        }
    });
});

};