import express, { application } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import {} from "dotenv/config";

const app = express();
const saltRounds = 10;
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, token missing" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized, invalid token" });
    }

    req.user = decoded;
    next();
  });
};

app.get("/auth/user", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token found" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ user: decoded });
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email =$1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;

      console.log(storedPassword);
      bcrypt.compare(password, storedPassword, (err, result) => {
        if (err) {
          console.log("Error in bcrypt compare", err);
        } else {
          if (result) {
            const token = jwt.sign(
              { userId: user.id, email: user.email },
              SECRET_KEY,
              { expiresIn: "168h" }
            );
            res.cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "Strict",
              path: "/",
              maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return [res.json({ message: "Login successful", token })];
          } else {
            return res.status(400).json({ message: "Invalid password" });
          }
        }
      });
    } else {
      return res.status(404).json({ message: "User not found, try Sign up." });
    }
  } catch (err) {
    console.log("server error in login", err);
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/find-movies",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    if (req.user) {
      res.cookie("token", req.user.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.redirect("http://localhost:5173");
    } else {
      res.redirect("http://localhost:5173/login");
    }
  }
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/find-movies",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.emails[0].value,
        ]);

        let user;
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [profile.displayName, profile.emails[0].value, profile.id]
          );
          user = newUser.rows[0];
        } else {
          user = result.rows[0];
        }

        const token = jwt.sign(
          { userId: user.id, email: user.email },
          SECRET_KEY,
          { expiresIn: "168h" }
        );

        user.token = token;
        return cb(null, user);
      } catch (error) {
        console.error("Google Strategy Error:", error);
        return cb(error);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      cb(null, result.rows[0]);
    } else {
      cb(null, false);
    }
  } catch (error) {
    cb(error, null);
  }
});

app.post("/signUp", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.json({ message: "Email already exists, Try logging in " });
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log("Error in bcrypt hashing", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (username,email,password) VALUES ($1,$2,$3)",
            [username, email, hash]
          );
          let user;
          if (result.rows.length > 0) {
            user = result.rows[0];
          }
          console.log(user);

          const token = jwt.sign(
            { userId: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: "1h" }
          );

          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000,
          });

          return res.json({ message: "Signup successful", token });
        }
      });
    }
  } catch (err) {
    console.error("Error during signup:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/account", authMiddleware, async (req, res) => {
  const email = req.user.email;
  console.log(req.user);
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rowCount > 0) {
      res.status(200).json({
        message: "data fetching about account successful",
        user: result.rows[0],
      });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "error in fetching data", error });
  }
});

app.delete("/account", authMiddleware, async (req, res) => {
  const email = req.user.email;
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rowCount > 0) {
      await db.query("DELETE FROM users WHERE email = $1", [email]);

      res
        .status(200)
        .json({ message: " account delete successful", user: result.rows[0] });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "error in deleting account", error });
  }
});

app.post("/update-account", authMiddleware, async (req, res) => {
  const { userId } = req.user;
  const { username, email, password } = req.body.fields;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = result.rows[0];
    let updateFields = [];
    let queryParams = [];
    let queryCount = 1;

    if (username != user.username) {
      updateFields.push(`username = $${queryCount}`);
      queryParams.push(username);
      queryCount++;
    }

    if (email != user.email) {
      updateFields.push(`email = $${queryCount}`);
      queryParams.push(email);
      queryCount++;
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if (user.password != hashedPassword) {
      updateFields.push(`password = $${queryCount}`);
      queryParams.push(hashedPassword);
      queryCount++;
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: "No changes detected" });
    }

    const query = `
    UPDATE users
    SET ${updateFields.join(", ")}
    WHERE id = $${queryParams.length + 1}`;
    queryParams.push(userId);

    await db.query(query, queryParams);

    res.json({ message: "User details updated successfully" });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: true });
  return res.status(200).json({ message: "Logout successful" });
});

app.get("/watch-list", authMiddleware, async (req, res) => {
  const { userId } = req.user;
  try {
    const result = await db.query("SELECT * FROM watchlist WHERE user_id=$1", [
      userId,
    ]);
    if (result.rowCount === 0) {
      res.status(200).json({ message: "No Items present in watch list." });
    } else {
      res.status(200).json({ message: "backend succesful", watchlist: result });
    }
  } catch (error) {
    console.error("Error in fetching watch-list");
    res.status(500).json({ message: "Server error in fetching watch-list" });
  }
});

app.post("/watch-list", authMiddleware, async (req, res) => {
  const { userId } = req.user;
  const { id, movie_or_tvshow } = req.body;
  try {
    const response = await db.query(
      "SELECT * FROM watchlist WHERE user_id = $1 AND itemid= $2",
      [userId, id]
    );
    if (response.rowCount === 0) {
      const result = await db.query(
        "INSERT INTO watchlist (user_id,movie_or_tvshow,itemid) VALUES ($1,$2,$3)",
        [userId, movie_or_tvshow, id]
      );

      res.status(200).json({ message: "Added to watch list successfully" });
    } else {
      res.status(400).json({ message: "Item already exist in the watch list" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error in adding the item to watch list.", error });
  }
});

app.delete("/watch-list", authMiddleware, async (req, res) => {
  const { userId } = req.user;
  const { id } = req.query;

  try {
    const response = await db.query(
      "SELECT * FROM watchlist WHERE user_id=$1 AND itemid=$2",
      [userId, id]
    );
    if (response.rowCount > 0) {
      await db.query("DELETE FROM watchlist WHERE user_id=$1 AND itemid=$2", [
        userId,
        id,
      ]);
      res.status(200).json({ message: "Successfully deleted" });
    } else {
      res.status(400).json({ message: "Item not found in Watch list" });
    }
  } catch (error) {
    console.error("Error in deleting item:", error);
    res
      .status(500)
      .json({ message: "Backend Error in deleting Item from list" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
