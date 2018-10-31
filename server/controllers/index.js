const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
const Repertoire = require('../db/models/repertoire')
//const passport = require('../passport')


    router.delete('/:id', (req,res) => {
        Repertoire.deleteOne({ _id: req.params.id })
        .then(function(removed) {
          res.json(removed);
        }).catch(function(err,removed) {
            // If an error occurred, send it to the client
              res.json(err);
          });
      });

    router.post('/:id', (req,res) => {
        console.log(req.body);
          Repertoire
            .create(req.body)
            .then(function(dbRepertoire) {
                User.findOneAndUpdate({ _id:req.params.id }, {$push: { catalog: dbRepertoire._id }}, { new: true })
                .then(res.json(dbRepertoire))  
                .catch(err => res.status(422).json(err));
              })       
    })

    
    router.get('/:id', (req,res) => {
        User.findOne({ _id: req.params.id })
            .populate({path: "catalog", options: { sort: { 'composer': 1 } } })
            .then(function(dbUser) {
                console.log(res.data);
                if(dbUser) {
                res.json(dbUser);
            }
            })

            .catch(err => res.status(422).json(err));    
    })

 
    module.exports = router