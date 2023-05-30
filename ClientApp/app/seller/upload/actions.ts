'use server'

import { gql } from "@apollo/client";
import client from "@/src/apollo";

const UPLOAD_MUTATION = gql`
    mutation upload(
        $name: String!
        $description: String!
        $price: String!
    ) {
        products {
            upload(name: $name, description: $description, price: $price) {
                token
                status
                payload {
                    __typename
                }
            }
        }
    }
`;

export async function handleUpload(formData: FormData) {
    
    // refactor to include base64 extraction of images on this end instead of the client

    const mutation = await client.mutate({
        mutation: UPLOAD_MUTATION,
        variables: {
            name: formData.get('name'),
            description: formData.get('description'),
            price: formData.get('price'),
            id: formData.get('id'),
        }
    });

    return mutation.data.products.upload
}