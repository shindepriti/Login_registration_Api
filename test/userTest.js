const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server')
const expect = require('chai').expect
chai.use(chaiHttp)

describe(`user api test`,() => {
    it("givenRouteConnection_whenProper_shouldReturnMessage",() =>{
        chai
        .request(app)
        .get("/")
        .end((err,res) =>{
            expect(res.body.message).to.equals("User Backend Api")
        })
    })
    
    it("givenNewUser_whenRegister_shouldReturnSucessMessage",(done) =>{
        
        let user = {
            firstName : "priti",
            lastName : "shinde",
            emailId : "shindepriti@gmail.com",
            password : "shinde123"
        } 
        chai
        .request(app)
        .post("/register")
        .send(user)
        .end((err,res) =>{
            expect(res).to.have.status(200);
            

        })
        done()   
    })



})