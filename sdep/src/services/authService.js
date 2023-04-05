import { api, requestConfig } from "../utils/config";

// Register a user
const register = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/usuarios", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(res));
      localStorage.setItem("token", JSON.stringify(res.token));
    }
        
    return res;
  } catch (error) {
    console.log(error);
  }
};

// Logout a user
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

// Sign in a user
const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/usuarios/login", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res._id) {
      localStorage.setItem("user", JSON.stringify(res));
      localStorage.setItem("token", JSON.stringify(res.token));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;