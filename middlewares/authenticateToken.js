const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(
    token,
    "ad165b11320bc91501ab08613cc3a48a62a6caca4d5c8b14ca82cc313b3b96cd",
    (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.user = user;
      next();
    }
  );
}

module.exports = authenticateToken;
