import { gql } from 'apollo-boost';

export const getHackathons = gql`
query($start: DateTime, $end:DateTime, $user: ID) {
  hackathons(where: {
    start: $start,
    end: $end
  }) {
    id
    name
    description
    start
    end
    participants{
      id
    }
    maxParticipants
    type
    createdAt
  }
  user(where: {id: $user}){
    id
    name
    email
    type
    expertise
    squads{
      id
      hackathon{
        id
      }
    }
    participant{
      id
    }
    createdHackathon{
      id
    }
    createdAt
    updatedAt
  }
}
`
export const GET_TERM_BY_HACKATHON_ID = gql`
query($id: ID!) {
  hackathon(where: { id: $id }) {
    terms{
      id
      name
      content
    }
  }
}
`
export const GET_HACKATHON_BY_ID = gql`
query($id: ID!) {
  hackathon(where: { id: $id }) {
    id
    name
    start
    end
    description
    maxParticipants
    participants{
      id
    }
    squads{
      id
    }
    terms{
      id
      name
      content
    }
    award{
      id
      name
      description
    }

  }
}
`