import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {resolvers, typeDefs} from "./src/gql/Apollo";


const http = require('http');
const cors = require('cors');

const PORT = 4000;
const app = express();
app.use(cors());


const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.applyMiddleware({
    app
});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({port: PORT}, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});
