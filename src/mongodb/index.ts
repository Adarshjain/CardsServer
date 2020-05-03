import {MongoClient} from "mongodb";

const uri = "mongodb+srv://radUser:radPassword@chokdi-vkqpw.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});
