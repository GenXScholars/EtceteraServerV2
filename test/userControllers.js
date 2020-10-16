process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let User = require("../src/app/models/userModel");

//Require the dev-dependencies
var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/app/server");
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
  
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => { 
           done();           
        });        
    });
/*
  * Test the /GET route
  */
  describe('/GET all users', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/v1/user/get-all')
            .end((err, res) => {
              if (err) done(err);
                  res.should.have.status(200);
                  res.body.should.be.an('array');
                  res.body.length.should.be.equal(0);
              done();
            });
      });
  });

  /*
* Test the /POST route
*/
describe('/POST  register user', () => {
    it('it should register a user', (done) => {
        
         let newUser = {
             username:"ogaga",
             password: "123456",
             email: "o@gmail.com"
         }  
            chai.request(server)
            .post('/api/v1/user/sign-up')
            .send(newUser)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql(`user with username ogaga was created`);
                    // res.body.book.should.have.property('username');
                    // res.body.book.should.have.property('password');
                    // res.body.book.should.have.property('email');
                done();
            });
    });
 });
});


