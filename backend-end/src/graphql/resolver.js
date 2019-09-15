import lodash from 'lodash'
import User from './resolvers/user.resolver'
import Petition from './resolvers/petition.resolver'
import CustomResolver from './resolvers/custom.resolver'


const resolvers = lodash.merge(
    User.Resolver,
    Petition.Resolver, {
    Query:
        lodash.merge(
            User.Query,
            Petition.Query
        ),
    Mutation:
        lodash.merge(
            User.Mutation,
            CustomResolver.Mutation,
            Petition.Mutation
        )
})


export default resolvers