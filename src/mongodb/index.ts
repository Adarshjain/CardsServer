import mongoose from "mongoose";

export async function connectMongo() {
    const mongo_uri = 'mongodb://localhost:27017/cards';
    await mongoose.connect(mongo_uri, {useNewUrlParser: true, useUnifiedTopology: true});
}

export async function disConnectMongo() {
    await mongoose.connection.close();
}

export  function mongooseIsConnected() {
    return mongoose.connection.readyState !== 0;
}
