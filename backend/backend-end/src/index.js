import express from 'express';
import { ApolloServer } from 'apollo-server-express';
let { typeDefs } = require(`../hack/prisma/${process.env.ENV || 'test'}/generated/prisma-schema`);
import resolvers from './graphql/resolver'
import customTypeAndMutations from './utils/customTypesAndMutations'
import * as auth from './services/auth'

typeDefs = customTypeAndMutations.addMutations(typeDefs)

typeDefs = customTypeAndMutations.addTypes(typeDefs)

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    tracing: true,
    context: auth.verifyRequest,
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

apolloServer.applyMiddleware({ app, path: '/', cors: true });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App running in http://localhost:${PORT}`)
});


module.exports = app;
