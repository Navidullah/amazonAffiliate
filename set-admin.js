// set-admin.js
const { MongoClient } = require("mongodb");

// Your MongoDB connection string
const uri =
  "mongodb+srv://ecommerceaffiliatewebsite:ALLAHISONE123@ecommerce.tdryy3h.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=ecommerce";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("app"); // Your database name
    const users = database.collection("users");

    // Your email address
    const userEmail = "addminyahya@gmail.com"; // CHANGE THIS

    // Check current user
    const user = await users.findOne({ email: userEmail });
    console.log("Current user:", user);

    // Update to admin
    const result = await users.updateOne(
      { email: userEmail },
      { $set: { role: "admin" } },
    );

    console.log("Update result:", result);

    // Verify update
    const updatedUser = await users.findOne({ email: userEmail });
    console.log("Updated user:", updatedUser);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
