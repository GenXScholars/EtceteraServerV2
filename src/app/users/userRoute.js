const express = require("express");
const router = express.Router();
const paths = require("../paths/users/usersPaths");


// to be added for multiple api calls

// var whitelist = ['http://example1.com', 'http://example2.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
const UserController = require("./user");

router.post(paths.userSignUp, UserController.register);
router.post(paths.userLogin, UserController.userLogin);
router.get(paths.getAllUsers, UserController.getAll);
router.get(paths.getSingleUser, UserController.getById);
router.get(paths.getCurrentUser, UserController.getCurrent);
router.put(paths.updateUser, UserController.update);

module.exports = router;