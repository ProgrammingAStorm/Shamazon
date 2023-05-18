import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import { gql } from '@apollo/client';

const resolvers = {
  Mutate: {
    login: (parent, args, context, info) => {
      console.log(args);

      return "bruh"
    }
  }
};

const typeDefs = gql`
  type Mutate {
    login: String
  }

  type ShopperResponse {
    token: String
    status: String
    payload: Shopper
  }

  type Shopper {
    id: String
    email: String
    firstName: String
    lastName: String
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}