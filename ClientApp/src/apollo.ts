import { ApolloClient, InMemoryCache } from "@apollo/client";
const { createUploadLink } = require('apollo-upload-client');

const client = new ApolloClient({
    uri: "http://localhost:5164/graphql",
    cache: new InMemoryCache(),
    link: createUploadLink()
});

export default client;