const express = require('express');
const cors = require('cors');
const createError = require('http-errors')
const doctenv = require('dotenv');
doctenv.config();
require("./config/db");

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/transactions", transactionRoutes);


// error handlers
app.use(async (req, res, next) => {
    next(createError.NotFound());
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message,
        error: err,
    });
});

const port = 5000;


app.listen(port, () => console.log("Server is listening on port: " + port));