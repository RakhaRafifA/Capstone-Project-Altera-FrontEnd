import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://sportly.hasura.app/v1/graphql",
    cache: new InMemoryCache(),
    headers: {
        "x-hasura-admin-secret": "6Kimw7jQRZYKW9k3Pz4KSO6MCJpPCywjE4XGYwXYPbq82UGtSUPbDGLYOKGIYKrQ",
    }
});

export default client;