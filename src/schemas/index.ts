import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar JSON
  scalar JSONObject

  type Records {
    mentions: [String]
    emoticons: [String]
    links: JSON
  }
  type Query {
    records(message: String!): Records
  }
`;