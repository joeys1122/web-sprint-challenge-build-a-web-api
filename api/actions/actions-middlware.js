// add middlewares here related to actions
const { get } = require('./actions-model');
const yup = require('yup');

const checkActionId = (req, res, next) => {
  get(req.params.id)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        next({ status: 404, message: `could not get action with id ${req.params.id}` });
      }
    })
    .catch(err => {
      console.log(err);
      next({ status: 500, message: 'error getting action' });
    });
};

const checkActionPost = async (req, res, next) => {
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

const checkActionUpdate = async (req, res, next) => {
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

module.exports = { checkActionId, checkActionPost, checkActionUpdate }