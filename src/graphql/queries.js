/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRecording = /* GraphQL */ `
  query GetRecording($id: ID!) {
    getRecording(id: $id) {
      id
      name
      description
      date
      userId
      userName
      image
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listRecordings = /* GraphQL */ `
  query ListRecordings(
    $filter: ModelRecordingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecordings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        date
        userId
        userName
        image
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
