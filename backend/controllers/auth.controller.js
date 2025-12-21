const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.query(
      "SELECT * FROM userss WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];

    // ⚠️ Plain password check (bcrypt removed as you asked)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
    role: user.role   // 🔥 REQUIRED
  },
  process.env.JWT_SECRET,
  { expiresIn: "24h" }
);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
