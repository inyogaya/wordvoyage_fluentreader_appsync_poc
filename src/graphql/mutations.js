/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRecording = /* GraphQL */ `
  mutation CreateRecording(
    $input: CreateRecordingInput!
    $condition: ModelRecordingConditionInput
  ) {
    createRecording(input: $input, condition: $condition) {
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
export const updateRecording = /* GraphQL */ `
  mutation UpdateRecording(
    $input: UpdateRecordingInput!
    $condition: ModelRecordingConditionInput
  ) {
    updateRecording(input: $input, condition: $condition) {
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
export const deleteRecording = /* GraphQL */ `
  mutation DeleteRecording(
    $input: DeleteRecordingInput!
    $condition: ModelRecordingConditionInput
  ) {
    deleteRecording(input: $input, condition: $condition) {
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
