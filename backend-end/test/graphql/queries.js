exports.getUserById = `
    query ($id: ID!){
            user(where: {id: $id}){
            id
            name
            email
        }
    }
`

exports.getUsers = `
    {
        users{
        id
        name
        email
        }
    }
`