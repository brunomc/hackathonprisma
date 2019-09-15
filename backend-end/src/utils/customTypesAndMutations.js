
const customMutations = [
    `authenticate(email: String!, password: String!): Token!`,
    `getUserByToken(token: String!): User!`,
    `requestResetPassword(email: String!): IsUserRegistered!`,
    'changePassword(token: String!, newPassword: String!): IsChangedPassword!',
]

const customTypes = [
    `type Token { token: String! }`,
    'type IsUserRegistered {isUserRegistered: Boolean!}',
    'type IsChangedPassword {isChangedPassword: Boolean!}'
]

const addTypes = (typeDefs) => {
    return typeDefs.replace('scalar Long', `scalar Long\n${customTypes.map((type) => `${type}\n`)}`)
}

const addMutations = (typeDefs) => {
    return typeDefs.replace(`createResetPassword(data: ResetPasswordCreateInput!): ResetPassword!`,
        `createResetPassword(data: ResetPasswordCreateInput!): ResetPassword!\n${customMutations.map((customMutation) => `${customMutation}\n`)}`)
}

export default {
    addMutations,
    addTypes
}