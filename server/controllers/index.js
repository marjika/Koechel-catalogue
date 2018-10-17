const express = require('express')
const router = express.Router()
//const User = require('../db/models/user')
const Repertoire = require('../db/models/repertoire')
//const passport = require('../passport')

    // findById: function(req, res) {
    //   db.Article
    //     .findById(req.params.id)
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    // },

    // remove: function(req, res) {
    //   db.Article
    //     .findById({ _id: req.params.id })
    //     .then(dbModel => dbModel.remove())
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    // }
    router.post('/', (req,res) => {
        console.log(req.body);
          Repertoire
            .create(req.body)
            .then(dbRepertoire => res.json(dbRepertoire))
            .catch(err => res.status(422).json(err));
        
    })
    
    router.get('/', (req,res) => {
        Repertoire
            .find(req.query)
            .sort({ date: -1 })
            .then(dbRepertoire => res.json(dbRepertoire))
            .catch(err => res.status(422).json(err));    
    })

    module.exports = router