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
      expense_claim_category: String
      expense_claim_id: String
      grant_id: String
      expense_status: Boolean
      provider_invoice_id: String
      provider_invoice_file_category: String
    ): UploadedFile!
  }

  type UploadedFile {
    url: String!
    path: String!
    type: String!
  }
`;
export default typeDefs;
