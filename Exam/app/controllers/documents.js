
var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  documents = mongoose.model('documents'); //import documents model


//module exports to import content
module.exports = function (app, config) {
	app.use('/api', router);


//request all documents from documents model
router.get('/documents', function (req, res, next) { 
    console.log('Get all documents', 'verbose');
    var query = document.find()
      .sort(req.query.order)
      .exec()
      .then(result => {
           if(result && result.length)
            {
            res.status(200).json(result);  //if no error send back code 201
            } 
           
            else 
            {
                res.status(404).json({message: "No documents"}); //send back error code 404 if not found 
            }
        })


      .catch(err =>  //catch block executed if error occurs
        {
        return next(err);
        });
  }); 

router.post('/documents', function (req, res, next) {
    console.log('Create document', 'verbose');
    var document = new document(req.body);
    document.save()  //save document and back code 201
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
        return next(err);
        });
    });

};
