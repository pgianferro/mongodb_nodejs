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

const ArraysampleAccounts = [
    {
    account_id:"MDB011235813",
    account_holder: "Ada Lovelace",
    account_type:"checking",
    balance: 60218
},
{
    account_id:"MDB829000001",
    account_holder: "Muhammad Ibn Musa",
    account_type:"savings",
    balance: 267914296
},
]

const sampleAccount = {
    account_holder: "Linus Torvalds",
    account_id:"MDB829001337",
    account_type:"checking",
    balance: 50352434,
    last_updated: new Date(),
}

const documentsToFind = { balance: {$gt : 4700}}
const documentToFind = { _id: new ObjectId("63f40361a6bff46f86ea6c9d")}

const documentToUpdate = { _id: new ObjectId("63f40361a6bff46f86ea6c9d")}
const update = { $inc: {balance: 100} }

const documentsToUpdate = { account_type: 'checking' }
const updates = { $push: { transfers_complete: 'TR413308000' } }

const documentToDelete = { _id: new ObjectId("63f3ffed5dc4425ebf64da57") }
const documentsToDelete = { balance: {$lt: 60318} }


const main = async () => {
    try {
        await connectToDatabase();                 
        
        // const databasesList = await client.db().admin().listDatabases();

        // let result = await accountsCollection.insertOne(sampleAccount)

        // databasesList.databases.forEach(db => console.log(`- ${db.name}`));
        // console.log(`Inserted Document: ${result.insertedId}`);

        // let result2 = await accountsCollection.insertMany(ArraysampleAccounts)

        // console.log(`Inserted ${result2.insertedCount} documents`);
        // console.log(result2)

        // let result3 = await accountsCollection.find(documentsToFind);


        // let docCount = await accountsCollection.countDocuments(documentsToFind)

        // await result3.forEach((doc) => console.log(doc))
        // console.log(`Found ${await docCount} documents`)

        // let result4 = await accountsCollection.findOne(documentToFind)
        
        // console.log(`Found one document`);
        // console.log(result4)

        // let result5 = await accountsCollection.updateOne(documentToUpdate, update)
        // result5.modifiedCount = 1
        // ? console.log('Updated one document')
        // : console.log('No documents updated')

        // let result6 = await accountsCollection.updateMany(documentsToUpdate, updates)
        // result6.modifiedCount > 1
        // ? console.log(`Updated ${result6.modifiedCount} documents`)
        // : console.log('No documents updated')

        // let result7 = await accountsCollection.deleteOne(documentToDelete)
        // result7.deletedCount === 1
        // ? console.log(`Deleted one document`)
        // : console.log('No documents deleted')

        let result8 = await accountsCollection.deleteMany(documentsToDelete)
        result8.deletedCount > 0
        ? console.log(`Deleted ${result8.deletedCount} documents`)
        : console.log('No documents deleted')

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

