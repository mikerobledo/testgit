var express = require('express'),
router = express.Router(),
logger = require('../../config/logger'),
mongoose = require('mongoose'),
Mypic = mongoose.model('mypics'),

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

router.get('/mypics/user/:userId',
 function (req, res, next){
    logger.log('Get Gallery for a user', 'verbose');

    Mypic.find ({userId: req.params.userId})
    .then(mypics => {
        if(mypics){
            res.status(200).json (mypics);
        } else {
            return next (error);
        }
    });

});

router.get('/mypics/:mypicId',requireAuth,  function (req, res, next){
    logger.log('Get Gallery List'+ req.params.mypicId, 'verbose');

    Mypic.findById(req.params.mypicId)
                .then(mypic => {
                    if(mypic){
                        res.status(200).json(mypic);
                    } else {
                        res.status(404).json({message: "No gallery found"});
                    }
                })
                .catch(error => {
                    return next(error);
                });
        });  

router.post('/mypics', function(req, res, next){
    logger.log('Create gallery', 'verbose');

    var mypic = new Mypic(req.body);
    mypic.save()
   .then(result => {
       res.status(201).json(result);
   })
   .catch( err => {
      return next(err);
   });
});  

router.put('/mypics/:mypicId', 
    function (req, res, next){
    logger.log('Update gallery'+ req.params.mypicId, 'verbose');

    
    Mypic.findOneAndUpdate({_id: req.params.mypicId}, 		
        req.body, {new:true, multi:false})
            .then(mypic => {
                res.status(200).json(mypic);
            })
            .catch(error => {
                return next(error);
            });
});


router.delete('/mypics/:mypicId',
 function (req, res, next){
    logger.log('Delete gallery'+ req.params.mypicId, 'verbose');

    Mypic.remove({ _id: req.params.mypicId })
            .then(user => {
                res.status(200).json({msg: "Gallery Deleted"});
            })
            .catch(error => {
                return next(error);
            });
});

var upload = multer({ storage: storage });

router.post('/mypics/upload/:userId/:mypicId', upload.any(), function(req, res, next){
    logger.log('Upload pics for gallery ' + req.params.mypicId + ' and ' + req.params.userId, 'verbose');
    
    Mypic.findById(req.params.mypicId, function(err, mypic){
        if(err){ 
            return next(err);
        } else {     
            if(req.files){
                mypic.file = {
                    fileName : req.files[0].filename,
                    originalName : req.files[0].originalname,
                    dateUploaded : new Date()
                };
            }           
            mypic.save()
                .then(mypic => {
                    res.status(200).json(mypic);
                })
                .catch(error => {
                    return next(error);
                });
        }
    });
});

};