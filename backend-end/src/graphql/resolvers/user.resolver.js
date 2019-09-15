import bcrypt from 'bcryptjs'
import upload from '../../services/uploadPhoto'

const Resolver = {
    User: {
        id: (parent, args, context, info) => {
            return parent.id
        },
        name: (parent, args, context, info) => {
            return parent.name
        },
        nomeDaMae: (parent, args, context, info) => {
            return parent.nomeDaMae
        },
        dataDeNascimento: (parent, args, context, info) => {
            return parent.dataDeNascimento
        },
        surname: (parent, args, context, info) => {
            return parent.surname
        },
        cpf: (parent, args, context, info) => {
            return parent.cpf
        },
        rg: (parent, args, context, info) => {
            return parent.rg
        },
        numeroCarteiraDeTrabalho: (parent, args, context, info) => {
            return parent.numeroCarteiraDeTrabalho
        },
        pis: (parent, args, context, info) => {
            return parent.pis
        },
        streetAddress: (parent, args, context, info) => {
            return parent.streetAddress
        },
        addressNumber: (parent, args, context, info) => {
            return parent.addressNumber
        },
        complement: (parent, args, context, info) => {
            return parent.complement
        },
        neighborhood: (parent, args, context, info) => {
            return parent.neighborhood
        },
        city: (parent, args, context, info) => {
            return parent.city
        },
        state: (parent, args, context, info) => {
            return parent.state
        },
        email: (parent, args, context, info) => {
            return parent.email
        },
        documentPhoto: (parent, args, context, info) => {
            return parent.documentPhoto
        },
        status: (parent, args, context, info) => {
            return parent.status
        },
        petitions: (parent, args, context, info) => {
            return parent.prisma.petitions({ where: { user: { id: parent.id } } })
        },
        phone: (parent, args, context, info) => {
            return parent.phone
        },
        resetsPassword: (parent, args, context, info) => {
            return context.prisma.resetPasswords({ where: { user: { id: parent.id } } })
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
    user: async (parent, { where }, context) => {
        const user = await context.prisma.user(where)
        user.password = "";
        return user;
    },
    users: (parent, args, context) => {
        return context.prisma.users(args)
    },
}

const Mutation = {
    updateUser: async (parent, args = { data, where }, context) => {
        if (args.data.documentPhoto) args.data.avatar = await upload.uploadPhoto(args.data.documentPhoto)
        if (args.data.password) {
            const salt = bcrypt.genSaltSync(10);
            args.data.password = bcrypt.hashSync(args.data.password, salt);
        }
        const user = context.prisma.updateUser(args)
        user.password = ''
        return user
    },
    createUser: async (parent, { data }, context) => {
        if (data.documentPhoto) args.data.avatar = await upload.uploadPhoto(data.documentPhoto)
        if (data.password) {
            const salt = bcrypt.genSaltSync(10);
            data.password = bcrypt.hashSync(data.password, salt);
        }
        const user = await context.prisma.createUser(data)
        user.password = ''
        return user
    },
}

export default {
    Resolver,
    Query,
    Mutation
}