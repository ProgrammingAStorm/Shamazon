'use client'

import { ApolloProvider } from "@apollo/client"
import client from "@/src/apollo-front"

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
}