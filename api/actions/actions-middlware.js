// add middlewares here related to actions
const { get } = require('./actions-model');
const getProj = require('../projects/projects-model').get;
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

const checkActionBody = async (req, res, next) => {
  const actionSchema = yup.object({
    project_id: yup.number().required(),
    notes: yup.string().trim().required(),
    description: yup.string().trim().max(128).required(),
  });

  const proj = await getProj(req.body.project_id);

  if (proj) {
    try {
      const validated = await actionSchema.validate(req.body);
      req.body = validated;
      next();
    } catch(err) {
      next({ status: 400, message: 'please fill in notes and description' });
    }
  } else {
    next({ status: 404, message: `could not get project with id ${req.action.project_id}` });
  }
};

module.exports = { checkActionId, checkActionBody }