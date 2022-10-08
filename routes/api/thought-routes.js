const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction

} = require('../../controllers/thought-controller');

router
.route('/')
.get(getAllThoughts)
.post(createThought);


router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought)

router
.route('/:userId')
.post(createThought);

router
.route('/:thoughtId/reactions')
.post(createReaction);

router
.route('/:thougthId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;