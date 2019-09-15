import { gql } from 'apollo-boost';

export const Authentication = gql`
    mutation($email: String!, $password: String!) {
        authenticate(email: $email, password: $password) {
            token
        }
    }
`