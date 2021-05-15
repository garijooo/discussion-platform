const express = require('express');
const router = express.Router();
const { createThread, deleteThread, fetchThread, fetchThreads } = require('../controllers/threadController');

router.route('/new').post(createThread);
router.route('/delete/:id').delete(deleteThread);
router.route('/get/:id').get(fetchThread);
router.route('/get').get(fetchThreads);


module.exports = router;