import { gql } from 'apollo-boost';

export const GetUserById = gql`
query ($id: ID!){
        user(where: {id: $id}){
        id
        name
        email
        type
        expertise
    }
}
`