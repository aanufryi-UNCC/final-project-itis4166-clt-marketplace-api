import { signUp, logIn, logOut } from '../services/authService.js';

export async function signUpHandler(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email, and password are required" });
    }

    const newUser = await signUp(username, email, password);
    return res.status(201).json({ message: "New user created" });
  } catch (err) {
    // If service sets a status (e.g., 409 for duplicate email), respect it
    if (err.status) {
      return res.status(err.status).json({ error: err.message });
    }
    console.error("Sign up error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}


export async function loginHandler(req, res, next) {
  try {
    const { email, password } = req.body;

    // Missing fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await loginUserService(email, password);

    // If service returned null → invalid email OR password
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const { accessToken, refreshToken, user: safeUser } = user;

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: safeUser
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
}

//For logging out users using refresh token
export async function logOutHandler(req, res) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: "No refresh token provided" });
    }

    await logOut(refreshToken);
    return res.status(200).json({ message: "Logout successful." });
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({ error: err.message });
    }
    console.error("Logout error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}