// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.get()
    .then(projects => {
      projects ?
      res.status(200).json(projects) :
      res.json([]);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'error getting projects' });
    });
});

router.get('/:id', (req, res) => {
  Projects.get(req.params.id)
    .then(project => {
      project ?
      res.status(200).json(project) :
      res.status(404).json({ message: `could not get project with id ${req.params.id}`});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'error getting project' });
    });
});

module.exports = router;