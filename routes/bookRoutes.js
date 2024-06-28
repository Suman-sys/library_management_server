const express = require('express');
const { getAllBooks, getBookById, addBook, updateBook, deleteBook } = require('../controllers/BookController');
const { auth, admin } = require('../middlewares/auth');

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", auth, admin, getBookById);
router.post("/", auth, admin, addBook);
router.put("/:id", auth, admin, updateBook);
router.delete("/:id", auth, admin, deleteBook);

module.exports = router;