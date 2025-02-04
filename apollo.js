import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import userResolver from "./resolvers/userResolver.js"
import userTypeDef from "./typeDefs/userTypeDef.js";


const apolloserver = new ApolloServer({
    typeDefs: userTypeDef,
    resolvers: userResolver
});

export default apolloserver;

 


