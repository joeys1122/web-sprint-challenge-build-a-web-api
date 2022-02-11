// add middlewares here related to projects
const { get } = require('./projects-model');
const yup = require('yup');

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

const checkProjectPost = async (req, res, next) => {
  const projectSchema = yup.object({
    name: yup.string().trim().required(),
    description: yup.string().trim().required()
  });
  try {
    const validated = await projectSchema.validate(req.body);
    req.body = validated;
    next();
  } catch(err) {
    next({ status: 400, message: 'please enter a name and description' });
  }
};

const checkProjectUpdate = async (req, res, next) => {
  const projectSchema = yup.object({
    name: yup.string().trim().required(),
    description: yup.string().trim().required(),
    completed: yup.boolean().required()
  });
  try {
    const validated = await projectSchema.validate(req.body);
    req.body = validated;
    next();
  } catch(err) {
    next({ status: 400, message: 'please enter a name, description, and completed status' });
  }
}

module.exports = { checkProjectId, checkProjectPost, checkProjectUpdate }