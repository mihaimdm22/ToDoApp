import express from "express";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

async function initServer() {
    const app = express();
    app.use(cors());
    dotenv.config();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.use((req, res) => {
        res.send("Server started");
    });
    const PORT = process.env.PORT || 5050;
    try {
        await mongoose.connect(process.env.mongodb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Mongoose connected on port ${PORT}`);
    } catch (error) {
        console.log(error);
    }
    app.listen(PORT, () =>
        console.log(`Express server is running on port ${PORT}`)
    );
}

initServer();
