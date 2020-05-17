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

})