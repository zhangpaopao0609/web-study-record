module.exports = app => ({
  'get /': app.$ctrl.home.index,
  'get /detail': app.$ctrl.home.detail,
  'get /model': app.$ctrl.home.model,
});
