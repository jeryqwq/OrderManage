const userController = require('./controller/user');

module.exports = (router) => {
  router.prefix('/api');
  router
    .get('/dashboard', userController.dashboard)
    .get('/orderInfos', userController.orderInfos)
    .post('/register', userController.register)
    .post('/logout', userController.logout);
};
