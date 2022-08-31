let express = require('express');
let router = express.Router();

let userController = require('./controllers/userController');

router.get('/',(request,response)=>response.redirect('/user'));
router.post('/user/add',userController.userAdd);
router.get('/user/update/:i',userController.userUpdate);
router.post('/user',userController.userNew);
router.post('/user/update',userController.userChange);
router.get('/user/delete/:i',userController.userDelete);
router.post('/user',userController.userList);