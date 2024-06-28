const express = require('express');
const { issueBook, returnBook, getMyTransactionHistory } = require('../controllers/TransactionController');
const { auth, admin } = require('../middlewares/auth');

const router = express.Router();

router.post("/issue", auth, admin, issueBook)
router.post("/return", auth, admin,  returnBook);
router.post("/transaction-history", auth, getMyTransactionHistory);

module.exports = router;