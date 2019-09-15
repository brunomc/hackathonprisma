import { gql } from 'apollo-boost';


export const GET_TERM_BY_HACKATHON_ID = gql`
query($id: ID!) {
  hackathon(where: { id: $id }) {
    terms{
      id
      name
      content
    }
  }
}`;
