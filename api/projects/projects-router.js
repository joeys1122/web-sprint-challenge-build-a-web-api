// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model');

const { checkProjectId, checkProjectPost, checkProjectUpdate } = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      console.log(err);
      next({ status: 500, message: 'error getting projects' });
    });
});

router.get('/:id', checkProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.post('/', checkProjectPost, (req, res, next) => {
  Projects.insert(req.body)
    .then(proj => {
      res.status(201).json(proj);
    })
    .catch(err => {
      console.log(err);
      next({ status: 500, message: 'error posting project' });
    });
});

router.put('/:id', checkProjectId, checkProjectUpdate, async (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then(proj => {
      res.status(200).json(proj);
    })
    .catch(err => {
      console.log(err);
      next({ status: 500, message: 'error updating project' });
    });
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = router;