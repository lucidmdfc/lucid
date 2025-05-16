import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Upload

  type Query {
    sayHello: String!
  }

  type Mutation {
    uploadFile(
      file: Upload!
      documentCategory: String!
      expense_claim_category: String!
      expense_claim_id: String!
      expense_status: Boolean!
    ): UploadedFile!
  }

  type UploadedFile {
    url: String!
    path: String!
    type: String!
  }
`;
export default typeDefs;
