'use server';

import { gql } from "@apollo/client";
import client from "@/src/apollo";

const LOGIN_MUTATION = gql`
    mutation login(
        $email: String!
        $password: String!
    ) {
        shoppers {
            login(email: $email, password: $password) {
                token
                status
                payload {
                    id
                    firstName
                    lastName
                    interests
                    reviews
                    orders
                    cart
                }
            }
        }
    }
`;

export async function handleLogin(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    const mutation = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
            email,
            password
        }
    });

    return mutation.data.shoppers.login
}

