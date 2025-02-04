const userTypeDef = `
  type Query {
    greeting: String
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): successInfo
    loginEmail(email: String!, password: String!): loginInfo
    loginGoogle( email: String!): loginInfo
     validateToken(token: String!): ValidateTokenResponse!
  }

  type successInfo {
    success: Boolean
    message: String
    token: String
  }

  type loginInfo {
    success: Boolean
    message: String
    token: String
    email: String
    name: String
  }
  type ValidateTokenResponse {
  success: Boolean!
  message: String!
  user: User
}
type User {
  id: ID!
  name: String!
  email: String!
}
`;

export default userTypeDef;
