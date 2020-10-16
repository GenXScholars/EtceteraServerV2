const expressJwt = require("express-jwt");
const JWT = require("jsonwebtoken");
const userService = require("../app/users/userServices");
const jwtSecret = require("../config/constants");
const merchantServices = require("../app/merchants/merchantServices");
const adminServices = require("../app/admin/adminServices");



function jwt() {
    const secret = jwtSecret.SECRET;
    return expressJwt({
        secret,  algorithms: ["HS256"],
        // credentialsRequired: false,
        getToken: function fromHeaderOrQuerystring (req) {
          if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
              return req.headers.authorization.split(" ")[1];
          } else if (req.query && req.query.token) {
            return req.query.token;
          }
          return null;
        }
      }).unless({
        path: [
            // public routes that don't require authentication
            "/",
            "/api/v1/admin/sign-up",
            "/api/v1/admin/login",
            "/api/v1/user/sign-up",
            "/api/v1/merchant/sign-up",
            "/api/v1/user/login",
            "/api/v1/merchant/login",
            "/api-docs",
            "/favicon.ico"
        ]
    });
    
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.user);
    const merchant = await merchantServices.getById(payload.merchant);
    const admin = await adminServices.getById(payload.admin);

    // revoke token if user no longer exists
    if (!user || !merchant || !admin) {
        return done(null, true);
    }

    done();
};

module.exports = jwt;