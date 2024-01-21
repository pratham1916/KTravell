const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const jwt = require("jsonwebtoken");
const SecretKey = "pratham";
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001;

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = require("./db.json").users;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({ status: "error", message: "User not found" });
  }

  if (user.password !== password) {
    return res
      .status(401)
      .json({ status: "error", message: "Incorrect Password" });
  }

  const token = jwt.sign({ username }, SecretKey, { expiresIn: "2h" });

  return res.json({
    user,
    token,
    status: "Success",
    message: "Login Successfull",
  });
});

// Middleware for token verification
server.use((req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decode = jwt.verify(token, SecretKey);
      req.user = decode;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token is invalid" });
    }
  } else {
    if (req.path.includes("/users") || req.path.includes("/destination")) {
      return next();
    }
    return res.status(401).json({ message: "Unauthorized" });
  }
});

// Middleware for protecting only the booking POST route
server.post("/booking", (req, res, next) => {
  if (req.user && req.user.username) {
    // User is authenticated, allow access to the booking POST route
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

server.post("/users", async (req, res, next) => {
  const { username } = req.body;
  const api = "https://korea-api.onrender.com";

  const users = await fetch(`${api}/users`).then((response) => {
    return response;
  });

  const usernameExists = users.some((user) => user.username === username);

  if (usernameExists) {
    return res
      .status(400)
      .json({ status: "error", message: "Username already exists" });
  }

  next();
});

server.use(router);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});