// add middlewares here related to projects
const { get } = require('./projects-model');

const checkProjectId = (req, res, next) => {
  get(req.params.id)
    .then(proj => {
      if (proj) {
        req.project = proj;
        next();
      } else {
        next({ status: 404, message: `could not get project with id ${req.params.id}` });
      }
    })
    .catch(err => {
      console.log(err);
      next({ status: 500, message: 'error getting project' });
    });
};

const checkProjectBody = (req, res, next) => {
  if (req.body.name && req.body.description) {
    next();
  } else {
    next({ status: 400, message: 'please enter a name and description' });
  }
};

module.exports = { checkProjectId, checkProjectBody }