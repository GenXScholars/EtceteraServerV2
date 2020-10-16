process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Admin = require("../src/app/models/adminModel");

//Require the dev-dependencies
var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/app/server");
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Admins", () => {
  beforeEach((done) => {
    //Before each test we empty the database
    Admin.remove({}, (err) => {
      done();
    });
  });
  /*
   * Test the /GET route
   */
  describe("/GET all admins", () => {
    it("it should GET all the admins", (done) => {
        chai.request(server)
        .get("/api/v1/admin/get-all")
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.length.should.be.equal(0);
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe("/POST  register an admin", () => {
    it("it should register an admin", (done) => {
      const newAdmin = {
        username: "admin",
        password: "123456",
        email: "admin@gmail.com",
      };
      chai.request(server)
        .post("/api/v1/admin/sign-up")
        .send(newAdmin)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql(`admin with username admin was created`);
        //   res.body.book.should.have.property('username');
        //   res.body.book.should.have.property('password');
        //   res.body.book.should.have.property('email');
          done();
        });
    });
  });

 
});
