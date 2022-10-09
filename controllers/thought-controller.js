const {Thoughts, User} = require('../models');

const thoughtsController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
        .then(dbThoughtData => {console.log(dbThoughtData)
            res.json(dbThoughtData)}
            )
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //get thought by id
    getThoughtById(req, res) {
        console.log(req)
        Thoughts.findOne({_id: req.params.id})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
    },

    //create thought
    createThought(req, res) {
        console.log(req.body);
        Thoughts.create(req.body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
            {username: req.body.username},
            {$push: {thoughts: _id}},
            {new: true}
            );
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            return res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },

    //update Thought
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    
    //delete thought
    deleteThought(req, res) {
        Thoughts.findOneAndDelete ({_id: req.params.id})
        .then(deletedData => {
            if(!deletedData) {
                res.status(404).json({ message: 'No Thought found with this id!' });
                return;
            }
            return User.findOneAndUpdate(
                console.log(req.params),
                {_id: req.params.id},
                {$pull: {thoughts: req.params.id}},
                {new: true}
            );
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No user found with this username' });
              return;
            }
            res.json(dbThoughtData);
          })
        
        .catch(err => res.json(err));
    }, 

    //create reaction

    createReaction(req, res) {
        Thoughts.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$push: {reactions: req.body}},
            {new: true}
        )
        .then(dbReactionData => {
            if(!dbReactionData){
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbReactionData);
        })
        .catch(err => res.json(err));
    },

    //delete reaction



    deleteReaction(req, res) {
        console.log(req.params)
        Thoughts.findOneAndUpdate(
            
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {new: true}
       )
    .then(dbReactionData => {
           if(!dbReactionData){
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
           }
            res.json(dbReactionData);
        })
        .catch(err => res.json(err));
    }

};
module.exports = thoughtsController;