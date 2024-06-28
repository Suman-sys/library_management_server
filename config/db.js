const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/librarymanagementdb';

mongoose.connect(MONGO_URI)
.then(()=> console.log("DB connection established"))
.catch(err=> console.log("Error connecting to database:", err));