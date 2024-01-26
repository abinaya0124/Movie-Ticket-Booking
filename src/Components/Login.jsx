import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!user || !password) {
      setError("Please fill in all fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user)) {
      setError("Invalid email format.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!(hasUppercase && hasLowercase && hasSpecialChar && hasNumber)) {
      setError(
        "Password must contain at least one uppercase letter, lowercase letter, special character, and number."
      );
      return;
    }
    navigate("/booking");
  };

  return (
    <>
      <div className="w-full flex justify-center items-center h-[80vh] ">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">
            Log in to your account
          </h1>
          <input
            onChange={(e) => setUser(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="email"
            placeholder="Enter your email"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="password"
            placeholder="Enter your password"
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div
            className="w-full py-4 text-lg font-bold text-white text-center 
          bg-black rounded-lg hover:bg-gray-500 hover:text-black"
          >
            <button onClick={handleLogin}>Log in</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
