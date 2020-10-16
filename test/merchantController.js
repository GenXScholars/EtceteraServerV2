process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Merchant = require("../src/app/models/merchantModel");

//Require the dev-dependencies
var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/app/server");
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Merchants", () => {
  beforeEach((done) => {
    //Before each test we empty the database
    Merchant.remove({}, (err) => {
      done();
    });
  });
  /*
   * Test the /GET route
   */
  describe("/GET all merchants", () => {
    it("it should GET all the merchants", (done) => {
        chai.request(server)
        .get("/api/v1/merchant/get-all")
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
  describe("/POST  register merchant", () => {
    it("it should register a merchant", (done) => {
      let newMerchant = {
        username: "merchant",
        password: "123456",
        email: "merchant@gmail.com",
      };
      chai.request(server)
        .post("/api/v1/merchant/sign-up")
        .send(newMerchant)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql(`merchant with username merchant was created`);
          // res.body.book.should.have.property('username');
          // res.body.book.should.have.property('password');
          // res.body.book.should.have.property('email');
          done();
        });
    });
  });
});
