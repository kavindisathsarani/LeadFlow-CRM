const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const TEST_USER = {
  id: "1",
  email: "admin@example.com",
  hashedPassword: bcrypt.hashSync("password123", 10),
  name: "CRM Admin",
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  if (email !== TEST_USER.email) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const validPassword = await bcrypt.compare(password, TEST_USER.hashedPassword);
  if (!validPassword) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: TEST_USER.id, email: TEST_USER.email, name: TEST_USER.name },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return res.json({
    success: true,
    token,
    user: { id: TEST_USER.id, email: TEST_USER.email, name: TEST_USER.name },
  });
};

module.exports = { login };
