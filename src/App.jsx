import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Admin } from "./components/Admin";
import { Inicio } from "./components/Inicio";
import { Login } from "./components/Login";
import { Menu } from "./components/Menu";
import "bootstrap/dist/css/bootstrap.css";
import { Fires } from "./components/Fires";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/fires" element={<Fires />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
