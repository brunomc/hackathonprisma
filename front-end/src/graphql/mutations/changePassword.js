import gql from "graphql-tag";

export const CHANGE_PASSWORD = gql`
    mutation ($token: String! $password: String!) {
        changePassword(token: $token, newPassword: $password){
            isChangedPassword
        }
    }
`