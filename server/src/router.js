const userController = require('./controller/user');

module.exports = (router) => {
  router.prefix('/api');
  router
    .get('/dashboard', userController.dashboard)
    .get('/orderInfos', userController.orderInfos)
    .get('/disPatch', userController.disPatch)
    .get('/category', userController.category);
};
