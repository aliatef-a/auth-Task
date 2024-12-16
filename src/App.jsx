import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import Register from "./Components/Register";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    document.dir = "rtl";

    const user = localStorage.getItem("data");
    const token = localStorage.getItem("token");

    if (user && token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [setIsAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/register" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
