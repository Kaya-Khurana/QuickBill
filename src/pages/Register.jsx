import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });

      alert("✅ Registration successful! Please login.");
      navigate("/login"); // redirect to login page after success
    } catch (err) {
      console.error(err);
      alert("❌ User already exists or registration failed.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-[#28A745] mb-6">Register</h2>
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
          Register
        </button>
        <hr className="my-2" />
        <button
          type="submit"
          className="w-full bg-[#28A745] text-white p-2 rounded hover:bg-green-600"
          onClick={() => navigate("/login")}
        >
          Already Have An Account? Simply Login!!
        </button>
      </form>
    </div>
  );
}
