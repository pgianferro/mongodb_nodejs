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
    //Stage 1 -  $match:  the accounts with type checking and balance greater than $1.500
    { $match: { account_type: 'checking', balance: { $gte: 61000 }}},

    // Stage 2 - $sort: sort the documents in descending order (balance)

    { $sort: { balance: -1 }},
    // Stage 3 - $project: project only the requested fields and one computed field (account_type, balance, gbp_balance)
    {
      $project: {
        _id: 0,
        account_id: 1,
        account_type: 1,
        balance:1,
        gbp_balance: { $divide: ['$balance', 1.3] },
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

