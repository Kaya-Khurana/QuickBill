import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-[250px] right-0 h-16 bg-white shadow-md z-30 flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold text-[#28A745]">Dashboard</h2>
      <div className="flex items-center gap-4">
        {!user ? (
          <button
            className="bg-[#28A745] text-white px-4 py-1 rounded-full hover:bg-green-600"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        ) : (
          <button
            className="bg-[#28A745] text-white px-4 py-1 rounded-full hover:bg-green-600"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
