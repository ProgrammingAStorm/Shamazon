'use server'

import { gql } from "@apollo/client";
import client from "@/src/apollo";

const SIGNUP_MUTATION = gql`
    mutation signup(
        $email: String!
        $password: String!
        $name: String!
    ) {
        sellers {
            signup(email: $email, password: $password, name: $name) {
                token
                status
                payload {
                    id
                    name
                    products {
                        __typename
                    }
                    orders {
                        __typename
                    }
                }
            }
        }
    }
`;

export async function handleSignup(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');

    const mutation = await client.mutate({
        mutation: SIGNUP_MUTATION,
        variables: {
            email,
            password,
            name
        }
    });

    return mutation.data.sellers.signup
}