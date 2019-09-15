
const Resolver = {
    Petition: {
        id: (parent, args, context, info) => {
            return parent.id
        },
        title: (parent, args, context, info) => {
            return parent.title
        },
        questions: (parent, args, context, info) => {
            return parent.questions
        },
        user: async (parent, args, context, info) => {
            const user = await context.prisma.users({ where: { petitions_some: { id: parent.id } } })
            return user[0]
        },
        createdAt: (parent, args, context, info) => {
            return parent.createdAt
        },
        updatedAt: (parent, args, context, info) => {
            return parent.updatedAt
        },
    }
}

const Query = {
    petition: (parent, { where }, context) => {
        return context.prisma.petition(where)
    },
    petitions: (parent, args, context) => {
        return context.prisma.petitions(args)
    },
}

const Mutation = {
    updatePetition: (parent, args = { data, where }, context) => {
        return context.prisma.updatePetition(args)
    },
    createPetition: (parent, { data }, context) => {
        return context.prisma.createPetition(data)
    },
}

export default {
    Resolver,
    Query,
    Mutation
}