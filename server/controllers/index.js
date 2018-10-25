const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
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
            .populate("catalog")
            .then(function(dbUser) {
                console.log(dbUser);
                if(dbUser) {
                res.json(dbUser);
            }
            })
            //.sort({ date: -1 })
            //.exec(dbRepertoire => res.json(dbRepertoire))
            .catch(err => res.status(422).json(err));    
    })

    // app.get("/articles/:id", function(req, res) {
    //     console.log(req.params.id);
    //     // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    //     db.Article.findOne({ _id: req.params.id })
    //       // ..and populate all of the notes associated with it
    //       .populate("note")
    //       .then(function(dbArticle) {
    //         // If we were able to successfully find an Article with the given id, send it back to the client
    //         console.log(dbArticle);
    //         if (dbArticle) {
    //         res.render("articles", {
    //           data: dbArticle
    //         });
    //       }
    //       })
    //       .catch(function(err) {
    //         // If an error occurred, send it to the client
    //         res.json(err);
    //       });
    //   });

    module.exports = router