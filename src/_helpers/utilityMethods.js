module.exports.utils = {
    isValidPassword(password, user){
        bcrypt.compare(password, user.hash).then((res) => {
          return res;
      });
      }
}