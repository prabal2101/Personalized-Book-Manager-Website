const express = require("express");

const {
  handleBookStoreController,
  handleBookListsController,
  handleSearchBooksController,
  handleUpdateBookController,
  handleDeleteBookController,
} = require("../controllers/book.controller");

const { authMiddleware, adminOnly } = require("../middleware/auth");

const router = express.Router();

// GET ALL BOOKS
router.get("/bookLists", authMiddleware, handleBookListsController);

// SEARCH BOOKS
router.get("/search", authMiddleware, handleSearchBooksController);

// ADD BOOK (ADMIN)
router.post("/add-book", authMiddleware, adminOnly, handleBookStoreController);

// UPDATE BOOK (ADMIN)
router.put("/:id", authMiddleware, adminOnly, handleUpdateBookController);

// DELETE BOOK (ADMIN)
router.delete("/:id", authMiddleware, adminOnly, handleDeleteBookController);

module.exports = router;

