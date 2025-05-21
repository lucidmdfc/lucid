import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { supabase } from './supabaseClient';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from '@apollo/client/utilities';
import { OperationDefinitionNode } from 'graphql';

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`,
  headers: {
    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },
});

const customServerLink = createUploadLink({
  uri: '/api/graphql',
  fetch,
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
});

const authLink = setContext(async (_, { headers }) => {
  // Get the current session from Supabase
  const {
    data: { session },
  } = await supabase.auth.getSession();
  // Return the headers to the context so httpLink can read them
  const token = session ? `Bearer ${session.access_token}` : '';

  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query) as OperationDefinitionNode;

    const operationName = definition.name?.value;
    const isCustomOperation =
      definition.kind === 'OperationDefinition' && operationName === 'uploadFile';

    console.log(
      `Routing operation "${operationName}" to ${isCustomOperation ? 'custom server' : 'Supabase'}`
    );

    return isCustomOperation;
  },
  customServerLink, // Routes uploadFile
  httpLink // Routes everything else to Supabase
);

const createApolloClient = () => {
  return new ApolloClient({
    link: authLink.concat(splitLink),
    cache: new InMemoryCache(),
    credentials: 'include',
  });
};

export default createApolloClient;
