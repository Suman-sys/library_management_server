const Transaction = require('../model/Transaction');
const Book = require('../model/Book');
const createError = require('http-errors')

const issueBook = async (req, res, next) => {
    try{
        const { bookId, dueDate } = req.body;
        const book = await Book.findById(bookId);
        if(!book) throw new createError(404, "Book not found");
        if (!book.isAvailable) throw new createError(401, 'Book is not available.');
        
        const transaction = await new Transaction({
            user: req.user.id,
            book: bookId,
            transactionType: "borrowed",
            dueDate
        }).save()
        await Book.findByIdAndUpdate(bookId, {$set: {isAvailable: false}});
        res.status(200).json({transaction});
    }catch(err){
        next(err);
    }
}

const returnBook = async (req, res, next) => {
    try{
        const { bookId } = req.body;
        
        const transaction = await new Transaction({
            user: req.user.id,
            book: bookId,
            transactionType: "returned",
            dueDate: new Date()
        }).save()
        await Book.findByIdAndUpdate(bookId, {$set: {isAvailable: true}});
        res.status(200).json({transaction});
    }catch(err){
        next(err);
    }
}

const getMyTransactionHistory = async (req, res, next) => {
    try{
        const transactions = await Transaction.find({user: req.user.id});
        res.status(200).json(transactions);
    }catch(err){
        next(err);
    }
}

module.exports = { returnBook, issueBook, getMyTransactionHistory};