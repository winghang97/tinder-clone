import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage";
import MessagePage from "./pages/MessagePage";

function App() {
  const [gender, setGender] = useState("");

  const getGender = (value: string) => {
    setGender(value);
  };
  return (
    <Router>
      <Header getGender={getGender} gender={gender} />
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/message" element={<MessagePage />} />
        <Route path="/" element={<HomePage gender={gender} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
