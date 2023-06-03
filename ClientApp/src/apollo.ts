import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: "http://localhost:5164/graphql",
});

const authLink = setContext((_, { headers }) => {
    const isShopper = localStorage.getItem('isShopper');

    let token;

    if(isShopper) {
        token = localStorage.getItem('shopperToken');
    } else {
        token = localStorage.getItem('sellerToken');
    }

    return {
        ...headers,
        authorization: `Bearer ${token}`
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;