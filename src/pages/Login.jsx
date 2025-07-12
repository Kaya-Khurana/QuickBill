import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      const { token, user } = res.data;
      login(user, token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Invalid credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-[#28A745] mb-6">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          className="w-full border border-gray-300 p-2 mb-4 rounded"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full border border-gray-300 p-2 mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-[#28A745] text-white p-2 rounded hover:bg-green-600"
        >
          Login
        </button>
        <hr className="my-2" />
        <button
          type="submit"
          className="w-full bg-[#28A745] text-white p-2 rounded hover:bg-green-600"
          onClick={() => navigate("/register")}
        >
          Do Not Have An Account? Register With Us!!
        </button>
      </form>
    </div>
  );
}
