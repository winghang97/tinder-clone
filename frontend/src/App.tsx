import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import useToken from "./hooks/useToken";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [gender, setGender] = useState("");
  const { token, setToken } = useToken();

  const getGender = (value: string) => {
    setGender(value);
  };

  return (
    <Router>
      {token ? (
        <>
          <Header getGender={getGender} gender={gender} />
          <Routes>
            <Route path="/profile" element={<ProfilePage token={token} />} />
            <Route
              path="/"
              element={<HomePage gender={gender} token={token} />}
            />
          </Routes>
          <Footer />
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route
            path="/register"
            element={<RegisterPage setToken={setToken} />}
          />
        </Routes>
      )}
    </Router>
  );
}

export default App;
