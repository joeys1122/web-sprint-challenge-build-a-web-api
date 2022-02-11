// Write your "actions" router here!
const express = require('express');

const Actions = require('./actions-model');

const { checkActionId, checkActionPost, checkActionUpdate } = require('./actions-middlware');

const router = express.Router();

router.get('/', (req, res, next) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      next({ status: 500, message: 'error getting projects' });
    });
});

router.get('/:id', checkActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = router;