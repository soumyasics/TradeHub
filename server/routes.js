const router=require('express').Router()
const user=require('./User/userController')


//user routes
router.post('/registerUser',user.upload,user.registerUser);
router.post('/viewUserById/:id', user.viewUserById);
router.post('/editUserById/:id', user.editUserById);
router.post('/forgotPasswordUser', user.forgotPassword);
router.post('/viewUsers', user.viewUsers); 
router.post('/deActivateUserById/:id', user.deActivateUserById);
router.post('/activateUserById/:id', user.activateUserById);

router.post('/resetPasswordUser/:id', user.resetPassword);
router.post('/loginUser', user.login);
router.post('/requireAuthUser', user.requireAuth);


module.exports=router