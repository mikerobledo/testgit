
var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  documents = mongoose.model('docuements');


//module exports to import content
module.exports = function (app, config) {
	app.use('/api', router);


router.get('/documents', function (req, res, next) {
    console.log('Get all documents', 'verbose');
    var query = document.find()
      .sort(req.query.order)
      .exec()
      .then(result => {
           if(result && result.length) {
          res.status(200).json(result);
      } else {
          res.status(404).json({message: "No documents"});
      }
      })
      .catch(err => {
        return next(err);
      });
  }); 

router.post('/documents', function (req, res, next) {
console.log('Create document', 'verbose');
var document = new document(req.body);
document.save()
.then(result => {
    res.status(201).json(result);
})
.catch(err => {
    return next(err);
});
});

};
