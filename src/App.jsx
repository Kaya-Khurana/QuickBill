import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateInvoice from "./pages/CreateInvoice";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Sidebar />
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Register />} />
          <Route path="/create-invoice" element={<CreateInvoice />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
