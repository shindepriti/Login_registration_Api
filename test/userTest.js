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

    it(`givenUser_whenLogin_shouldReturnSucessMessage`,(done) =>{
        let user = {
             emailId:"sindepriti@gmail.com",
             password:"shinde123"                            
        }
        chai
        .request(app)
        .get("/login")
        .send(user)
        .end((err,res) => {
            expect(res).to.have.status(200)
        })
        done()
    })

    it("givenNewUser_whenRegisterImproperInfo_shouldReturnErrorMessage",(done) =>{
        chai
            .request(app)
            .post("/register")
            .send({
                firstName : "rout",
                lastName : "null",
                password : "route123"
            })
            .end((err,res) =>{
                expect(res).to.have.status(500);
            })
            done()   
    })

    
    it("givenNewUser_whenRegister_shouldReturnSucessMessage",(done) =>{
        
        let user = {
            firstName : "riyaa",
            lastName : "rakasah",
            emailId : "ritesh@gmail.com",
            password : "roshan123"
        } 
        chai
        .request(app)
        .post("/register")
        .send(user)
        .end((err,res) =>{
            expect(res).to.have.status(200);
            expect(res.body.message).to.equal("Registration sucessfull") 

        })
        done()   
    })


    it("givenUser_whenAlreadyRegister_shouldReturnErrorMessage",(done) =>{
        
        let user = {
            firstName : "route",
            lastName : "kkmal",
            emailId : "ritesh@gmail.com",
            password : "lklsmm123"
        } 
        chai
        .request(app)
        .post("/register")
        .send(user)
        .end((err,res) =>{
            expect(res).to.have.status(500);
            expect(res.body.message).to.equal("Email Already Exist") 

        })
        done()   
    })
})
    