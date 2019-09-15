import gql from "graphql-tag";

export const REQUEST_RESET_PASSWORD = gql`
    mutation ($email: String!){
        requestResetPassword(email: $email){
            isUserRegistered
        }
    }
`