'use server'

import { gql } from "@apollo/client";
import client from "@/src/apollo";

const UPLOAD_MUTATION = gql`
    mutation upload(
        $name: String!
        $description: String!
        $price: Float!
        $images: [String!]!
        $id: String!
    ) {
        products {
            upload(name: $name, description: $description, price: $price, images: $images, id: $id) {
                token
                status
                payload {
                    __typename
                }
            }
        }
    }
`;

export async function handleUpload(name: string, description: string, price: number, id: string, images: string[]) {
    const mutation = await client.mutate({
        mutation: UPLOAD_MUTATION,
        variables: {
            name,
            description,
            price,
            id,
            images
        }
    });

    return mutation.data.products.upload
}