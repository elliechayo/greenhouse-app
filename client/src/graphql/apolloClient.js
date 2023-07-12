import { ApolloClient, InMemoryCache } from "@apollo/client";
import { backend_URL } from "../config";

const client = new ApolloClient({
  uri: backend_URL + "/graphql",
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
});

export default client;
