// Write your "actions" router here!
const express = require('express');

const Actions = require('./actions-model');

const { checkActionId, checkActionBody } = require('./actions-middlware');

const router = express.Router();

router.get('/', (req, res, next) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      next({ status: 500, message: 'error getting actions' });
    });
});

router.get('/:id', checkActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.post('/', checkActionBody, (req, res, next) => {
  Actions.insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      console.log(err);
      next({ status: 500, message: 'error posting action' });
    });
});

router.put('/:id', checkActionId, checkActionBody, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log(err);
      next({ status: 500, message: 'error updating action' });
    });
});

router.delete('/:id', checkActionId, (req, res, next) => {
  Actions.remove(req.params.id)
    .then(deleted => {
      if (deleted) {
        res.send('');
      }
    })
    .catch(err => {
      console.log(err);
      next({ status: 500, message: 'error deleting action' });
    });
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = router;