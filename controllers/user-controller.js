const {User, Thoughts} = require('../models');

const userController = {
    //get all user
    getAllUser(req, res) {
        User.find({})
        .then(dbUserData => {
            console.log(dbUserData)
            res.json(dbUserData)
            })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //get one user by id
    getUserById({params}, res) {
        User.findOne({_id: params.id})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //create user
    createUser({body}, res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    //update user by id
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json ({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).jso(err));
    },

    //delete user
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No pizza found with this id'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err));
    },

    //add friends
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {new: true}
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json ({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).jso(err));

    },

    //delete friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {new: true}
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json ({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).jso(err));

    }
};

module.exports = userController;