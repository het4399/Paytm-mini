import { Route, Routes, BrowserRouter } from "react-router";
import { Signin } from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Send from "./pages/Send";
import Signup from "./pages/signup";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Send />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
