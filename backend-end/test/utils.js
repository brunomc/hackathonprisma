const { prisma } = require('../hack/prisma/test/generated/index');
const mutations = require('./graphql/mutations');

exports.getToken = (post, email, password) => {
    const body = {
        query: mutations.authenticate,
        variables: {
            email,
            password
        }
    }
    return post.send(body)
        .then((res) => {
            return res.body.data.authenticate.token
        })
}

exports.deleteUsers = async (emails) => {
    for (let index = 0; index < emails.length; index++) {
        const email = emails[index];
        const user = await prisma.deleteUser({ email })
        if (!user.name) throw new Error(user)
    }
}

