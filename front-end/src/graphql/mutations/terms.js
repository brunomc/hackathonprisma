import gql from "graphql-tag";

export const UPDATE_TERM = gql`
mutation ($name: String!, $content: String!, $term: ID!){
    updateTerm(data: {
      name: $name
      content: $content
    }, where: {
      id: $term
    }){
      id
      name
      content
  }
}
`
export const CREATE_TERM = gql`
mutation ($name: String!, $content: String!, $hackathon: ID!){
    createTerm(data: {
      name: $name
      content: $content
      hackathon: { connect: { id: $hackathon } }
    }){
      id
      name
      content
      hackathon {
        id
      }
  }
}
`