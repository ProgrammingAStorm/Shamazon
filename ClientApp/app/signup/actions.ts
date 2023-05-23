'use server';

import { gql } from "@apollo/client";
import client from "@/src/apollo";

const SIGNUP_MUTATION = gql`
    mutation signup(
        $email: String!
        $password: String!
        $firstName: String!
        $lastName: String
    ) {
        shoppers {
            signup(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
                token
                status
                payload {
                    id
                    firstName
                    lastName
                    interests
                    reviews {
                        __typename
                    }
                    orders {
                        __typename
                    }
                    cart {
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
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName')

    const mutation = await client.mutate({
        mutation: SIGNUP_MUTATION,
        variables: {
            email,
            password,
            firstName,
            lastName
        }
    });

    return mutation.data.shoppers.signup
}