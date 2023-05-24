'use server'

import { gql } from "@apollo/client";
import client from "@/src/apollo";

const UPLOAD_MUTATION = gql`
    mutation upload(
        $name: String!
        $description: String!
        $price: Float!
        $images: [String!]!
    ) {
        products {
            upload(name: $name, description: $description, price: $price, images: $images) {
                token
                status
                payload {
                    __typename
                }
            }
        }
    }
`;

export async function handleUpload(name: string, description: string, price: number, ID: string, images: string[]) {
    const mutation = await client.mutate({
        mutation: UPLOAD_MUTATION,
        variables: {
            name,
            description,
            price,
            ID,
            images
        }
    });

    return mutation.data.products.upload
}