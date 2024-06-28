const Book = require("../model/Book");
const createError = require('http-errors')

const getAllBooks = async (req, res, next) => {
    try{
        const books = await Book.find();
        res.status(200).json(books);
    }catch(err){
        next(err);
    }
}

const getBookById = async (req, res, next) => {
    try{
        const book = await Book.findById(req.params.id);
        if(!book) throw new createError(404, "Book not found");
        res.status(200).json(book);
    }catch(err){
        next(err);
    }
}

const addBook = async (req, res, next) => {
    try{
        const { name, author } = req.body;
        const book = await new Book({name, author}).save();
        res.status(200).json(book);
    }catch(err){
        next(err);
    }
}

const updateBook = async (req, res, next) => {
    try{
        let book = await Book.findById(req.params.id);
        if(!book) throw new createError(404, "Book not found");
        const { name, author } = req.body;
        book = new Book({name, author});
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, book, {new: true});
        res.status(200).json(updateBook);
    }catch(err){
        next(err);
    }
}

const deleteBook = async (req, res, next) => {
    try{
        let book = await Book.findById(req.params.id);
        if(!book) throw new createError(404, "Book not found");
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({msg: "Book deleted successfully"});
    }catch(err){
        next(err);
    }
}

module.exports = { getAllBooks, getBookById, addBook, deleteBook, updateBook};