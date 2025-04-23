import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { supabase } from './supabaseClient';

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`,
  headers: {
    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },
});

const authLink = setContext(async (_, { headers }) => {
  // Get the current session from Supabase
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);
  // Return the headers to the context so httpLink can read them
  const token = session ? `Bearer ${session.access_token}` : '';

  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const createApolloClient = () => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
