const fs = require('fs');

// Define the MongoDB connection details
const mongoConfig = {
  mongoURI: "mongodb://localhost:27017/mydatabase",
  dbName: "mydatabase",
  username: "myuser",
  password: "mypassword"
};

// Convert the MongoDB connection details to JSON format
const configJSON = JSON.stringify(mongoConfig, null, 2);

// Write the JSON data to config.json file
fs.writeFileSync('config.json', configJSON);

console.log('config.json file created successfully!');
