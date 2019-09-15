import { gql } from 'apollo-boost';

export const GetUserByToken = gql`
mutation($token: String!) {
  getUserByToken(token: $token) {
    id
    name
    email
    type
    expertise
    squads {
      id
    }
    participant {
      id
    }
    createdHackathon {
      id
    }
  }
}

`
export const CreateUser = gql`
mutation(
    $name: String!
    $email: String!
    $password: String!
    $type: UserType!
    $avatar: String
    $expertise: [UserExpertiseType!]!
  ) {
    createUser(
      data: { avatar: $avatar, name: $name, email: $email, password: $password, type: $type, expertise: {set: $expertise}}
    ) {
      id
      name
      email
      type
      expertise
    }
  }  
`
export const UpdateUser = gql`
mutation ($name: String, $password: String, $expertise: [UserExpertiseType!]!, $id: ID!){
  updateUser(data: {
    name: $name
    expertise: {set: $expertise}
    password: $password
  }, where: {id: $id})
  {
    id
    name
    expertise
  }
}
`
