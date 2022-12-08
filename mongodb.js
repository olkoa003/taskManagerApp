const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useUnifiedTopology: true });

// Database Name
const dbName = 'myProject';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('tasks');

    try {
        const insertResult = await collection.insertMany([{ description: 'Clean the house', compeleted: true },
        { description: 'Renew insepction', compeleted: false },
        { description: 'Pot Plants', compeleted: false }]);
        console.log('Inserted documents =>', insertResult);
    } catch (error) {
        if (error instanceof MongoServerError) {
            console.log(`Error worth logging: ${error}`); // special case for some reason
        }
        throw error; // still want to crash
    }

    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());