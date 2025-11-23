import { signUp, logIn, logOut } from '../services/authService.js';

//For signing up new users. Need username, email, password
export async function signUpHandler(req, res) {
    const { username ,email, password } = req.body; 
    const newUser = await signUp(username, email, password);
    res.status(201).json({ message: `New user created` });
}

//For logging in existing users. Need email, password
export async function logInHandler(req, res) {
    const { email, password } = req.body; 
    const accessToken = await logIn(email, password);
    res.status(200).json({ accessToken });
}

//For logging out users using refresh token
export async function logOutHandler(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'No refresh token provided' });
    await logOut(refreshToken);
    res.status(200).json({ message: 'Logout successful.' });
}