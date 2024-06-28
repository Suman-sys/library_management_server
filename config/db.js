const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("DB connection established"))
.catch(err=> console.log("Error connecting to database:", err));