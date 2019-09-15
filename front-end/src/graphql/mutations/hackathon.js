import gql from "graphql-tag";

export const SUBSCRIBE_HACKATHON = gql`
mutation subscribeHackathon($hackathonId: ID!, $participantId: ID!) {
  updateHackathon(data: {
    participants: {connect: {
      id: $participantId
    }}
  }, 
  where: {
    id: $hackathonId
  }){
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
  }
}
`

export const UNSUBSCRIBE_HACKATHON = gql`
mutation unsubscribeHackathon($hackathonId: ID!, $participantId: ID!) {
  updateHackathon(data: {
    participants: {disconnect: [{
      id: $participantId
    }]}
  }, 
  where: {
    id: $hackathonId
  }){
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
  }
}
`


export const UPDATE_HACKATHON = gql`
  mutation ($id: ID!, $name: String, $description: String, $start: DateTime!, $end: DateTime!, $maxParticipants: Int){
    updateHackathon(data: {
      name: $name
      description: $description
      start: $start
      end: $end
      maxParticipants: $maxParticipants
      type: PUBLIC
    }, where:{id:$id}){
      id
      name
      start
      end
      maxParticipants
      createdBy{
        email
        name
        id
        expertise
      }
    }
  }
`