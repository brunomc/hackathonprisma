const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../build/index');
const utils = require('./utils');
const mutations = require('./graphql/mutations');
const queries = require('./graphql/queries');

const uri = '/'
let token;

chai.use(chaiHttp);
chai.should();

const users = [
    {
        "name": "anacleto", "surname": "cabrito", "email": "anacleto@yahoo.com", "password": "anacleto1985@phoda"
    },
    {
        "name": "cleison", "surname": "alves", "email": "cleison@yahoo.com", "password": "cleisonhonda125"
    },
    {
        "name": "adalberto", "surname": "brito", "email": "adalberto@bol.com", "password": "surf040@"
    },
]

describe("User", () => {
    describe("Mutation", () => {
        it(`should create new user ${users[0].name} correctly`, (done) => {
            const user = users[0]
            const body = {
                query: mutations.mutationCreateUser,
                variables: user
            }
            chai.request(app)
                .post(uri)
                .send(body)
                .end(async (err, res) => {
                    console.log(JSON.stringify(res.body))
                    res.body.data.createUser.should.be.an('object')
                    res.body.data.createUser.name.should.be.a('string')
                    res.body.data.createUser.name.should.be.equal(user.name)
                    res.body.data.createUser.email.should.be.a('string')
                    res.body.data.createUser.email.should.be.equal(user.email)
                    users[0]['id'] = res.body.data.createUser.id
                    token = await utils.getToken(chai.request(app).post(uri), user.email, user.password)
                    token = `Bearer ${token}`
                    done()
                })
        })

        it(`should create new user ${users[1].name} correctly`, (done) => {
            const user = users[1]
            const body = {
                query: mutations.mutationCreateUser,
                variables: user
            }
            chai.request(app)
                .post(uri)
                .send(body)
                .end((err, res) => {
                    res.body.data.createUser.should.be.an('object')
                    res.body.data.createUser.name.should.be.a('string')
                    res.body.data.createUser.name.should.be.equal(user.name)
                    res.body.data.createUser.email.should.be.a('string')
                    res.body.data.createUser.email.should.be.equal(user.email)
                    done()
                })
        })

        it(`should create new user ${users[2].name} correctly`, (done) => {
            const user = users[2]
            const body = {
                query: mutations.mutationCreateUser,
                variables: user
            }
            chai.request(app)
                .post(uri)
                .send(body)
                .end((err, res) => {
                    res.body.data.createUser.should.be.an('object')
                    res.body.data.createUser.name.should.be.a('string')
                    res.body.data.createUser.name.should.be.equal(user.name)
                    res.body.data.createUser.email.should.be.a('string')
                    res.body.data.createUser.email.should.be.equal(user.email)
                    done()
                })
        })

        it("should update user correctly", (done) => {
            const body = {
                query: mutations.updateUser,
                variables: {
                    name: "taison",
                    password: 'macarrao',
                    id: users[0].id
                }
            }
            chai.request(app)
                .post(uri)
                .send(body)
                .set("Authorization", token)
                .end((err, res) => {
                    res.body.data.updateUser.should.be.an('object')
                    res.body.data.updateUser.name.should.be.a('string')
                    res.body.data.updateUser.name.should.be.equal('taison')
                    done()
                })
        })

    })

    describe("Query", () => {

        it("should return an user correctly", (done) => {
            const body = {
                query: queries.getUserById,
                variables: {
                    id: users[0].id
                }
            }
            chai.request(app)
                .post(uri)
                .send(body)
                .set('Authorization', token)
                .end((err, res) => {
                    res.body.data.user.should.be.an('object')
                    res.body.data.user.name.should.be.a('string')
                    res.body.data.user.name.should.be.equal('taison')
                    done()
                })
        })

        it("should return a list of users correctly", (done) => {
            const body = {
                query: queries.getUsers
            }
            chai.request(app)
                .post(uri)
                .send(body)
                .set('Authorization', token)
                .end((err, res) => {
                    res.body.data.users.should.be.an('array')
                    done()
                })
        })

    })

    after('Delete users', async () => await utils.deleteUsers(users.map(user => user.email)))
})
