import axios from "axios";
const API_KEY = "AIzaSyCIynDXpq-TqVEa9fBATsqILAZ92H1sucM";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;
  return token;
}

export async function createUser(email, password) {
  try {
    return await authenticate("signup", email, password);
  } catch (error) {
    console.log(error);
  }
}

export async function login(email, password) {
  try {
    return authenticate("signInWithPassword", email, password);
  } catch (error) {
    console.log(error);
  }
}
