'use server'

import { gql } from "@apollo/client";
import client from "@/src/apollo";
import { uploadFile } from "@/src/aws";
import { base64StringToBuffer } from "@/src/file";

interface IUploadParams {
    id: string,
    name: string,
    price: string,
    description: string,
    fileStrings: string[]
}

const UPLOAD_MUTATION = gql`
    mutation upload(
        $name: String!
        $description: String!
        $price: String!
        $id: String!
        $links: [String]!
    ) {
        products {
            upload(name: $name, description: $description, price: $price, id: $id, links: $links) {
                token
                status
                payload {
                    __typename
                }
            }
        }
    }
`;

const CHECK_NAME_QUERY = gql`
    query checkName(
        $name: String!
    ) {
        products {
            checkName(name: $name) {
                token
                status
                payload {
                    __typename
                }
            }
        }
    }
`;

export async function handleUpload({ id, name, price, description, fileStrings }: IUploadParams) {
    const fileLinks: string[] = []

    const query = await client.query({
        query: CHECK_NAME_QUERY,
        variables: {
            name
        }
    })

    if(query.data.products.checkName.status === 202) return query.data.products.checkName;

    fileStrings.forEach(async (value, index) => {
        const fileBuffer = base64StringToBuffer(value)
        const fileName = `${id}-${name}-${index}`;

        fileLinks.push(process.env.AWS_CDN_NAME! + fileName);

        await uploadFile(fileBuffer, fileName);
    })

    const mutation = await client.mutate({
        mutation: UPLOAD_MUTATION,
        variables: {
            name,
            description,
            price,
            id,
            links: fileLinks
        }
    });

    return mutation.data.products.upload
}