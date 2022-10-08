const {Thoughts, User} = require('../models');

const thoughtsController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //get thought by id
    getThoughtById(re, res) {
        Thoughts.findOne({_id: params.id})
        .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
    },

    //create thought
    createThought({body}, res) {
        Thoughts.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
            {_id: parames.userId},
            {$push: {thoughts: _id}},
            {new: true}
            );
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
        })
        .catch(err => res.json(err));
    },

    //update Thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
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
    deleteTought({params}, res) {
        Thoughts.findOneAndDelete ({_id: params.thoughtid})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            return User.findByIdAndUpdate(
                {_id: params.userId},
                {$pull: {thoughts: params.thoughtId}},
                {new: true}
            );
        })
        .catch(err => res.json(err));
    }, 

    //create reaction

    createReaction(req, res) {
        Thoughts.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reaction: req.body}},
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
    deleteReaction({params}, res) {
        Thoughts.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reationId}}},
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

}