import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:5164/graphql",
    cache: new InMemoryCache(),
});

export default client;

//https://localhost:7088
//http://localhost:5164