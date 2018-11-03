const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
const Repertoire = require('../db/models/repertoire')

router.get('/:id', (req,res) => {
    Repertoire.findOne({ _id: req.params.id })
		.then(dbRepertoire => res.json(dbRepertoire))
		.catch(err => res.status(422).json(err));      
})

router.put('/', function(req, res) {
    console.log(req.body);
    Repertoire.findOneAndUpdate({ _id: req.body.id }, { notes: req.body.notes }, { new: true })
        .then(function(dbNotes) {
          res.json(dbNotes);
        })
        .catch(function(err) {
          res.json(err);
        });
  });

module.exports = router