const { MongoClient, ObjectId } = require('mongodb');
const uri = require("./atlas_url")

const client = new MongoClient(uri)

const dbname = "bank" 
const collection_name = "accounts"

const accountsCollection = client.db(dbname).collection(collection_name);

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log(`Connected to the ${dbname} database`)
    } catch(err) {
        console.error(`Error connecting to the database: ${err}`)
    }
}
console.log(uri)



const pipeline = [
    //Stage 1: match the accounts with balance greater than $1.000
    { $match: { balance: { $gt: 1000 }}},
    // Stage 2: calculate average balance and total balance
    {
      $group: {
        _id: '$account_type',
        total_balance: { $sum: '$balance'},
        average_balance: { $avg: '$balance'}
      }
    }
]

const main = async () => {
    try {
        await connectToDatabase();                 
        
        let result = await accountsCollection.aggregate(pipeline);
        for await (const doc of result) {
            console.log(doc)
        } 

    }
    catch (err){
        console.error(`Error inserting document: ${err}`)
        // console.error(`Error connecting to the database: ${err}`)
    }
    finally {
        await client.close();
    }
}


//Run the main function
main();

