const router =require('express').Router();

// import all functions for the routes
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
    } = require('../../controllers/user-controller');

//set up Get all user and Post at /api/users

router
.route('/')
.get(getAllUser)
.post(createUser);


//set up Get on, Put and Delete at /api/users/id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

//set up route for addFriend and deleteFriends: /api/users/:userId/friend/:friendId

router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router; 