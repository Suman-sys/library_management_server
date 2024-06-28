const express = require('express');
const { getAllBooks, getBookById, addBook, updateBook, deleteBook } = require('../controllers/BookController');
const { auth, admin } = require('../middlewares/auth');

const router = express.Router();

router.get("/", auth, getAllBooks);
router.get("/:id", auth, getBookById);
router.post("/", auth, admin, addBook);
router.put("/:id", auth, admin, updateBook);
router.delete("/:id", auth, admin, deleteBook);

module.exports = router;