const { pool } = require("../config/db");

// ADD BOOK
const handleBookStoreController = async (req, res) => {
  try {
    const { bookName, bookTitle, author, sellingPrice, publishDate } = req.body;

    await pool.query(
      "INSERT INTO bookss (bookName, bookTitle, author, sellingPrice, publishDate) VALUES (?, ?, ?, ?, ?)",
      [bookName, bookTitle, author, sellingPrice, publishDate]
    );

    res.json({ message: "Book added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET BOOKS
const handleBookListsController = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM bookss");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SEARCH BOOKS
const handleSearchBooksController = async (req, res) => {
  try {
    const { query } = req.query;

    const [rows] = await pool.query(
      "SELECT * FROM bookss WHERE bookName LIKE ? OR author LIKE ?",
      [`%${query}%`, `%${query}%`]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE BOOK
const handleUpdateBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookName, bookTitle, author, sellingPrice, publishDate } = req.body;

    await pool.query(
      "UPDATE bookss SET bookName=?, bookTitle=?, author=?, sellingPrice=?, publishDate=? WHERE id=?",
      [bookName, bookTitle, author, sellingPrice, publishDate, id]
    );

    res.json({ message: "Book updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE BOOK
const handleDeleteBookController = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM bookss WHERE id=?", [id]);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  handleBookStoreController,
  handleBookListsController,
  handleSearchBooksController,
  handleUpdateBookController,
  handleDeleteBookController,
};
