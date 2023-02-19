import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Funds from "./pages/funds";
import KillCount from "./pages/killCount";
import Header from "./components/header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Funds />} path="/" />
        <Route element={<KillCount />} path="/kills" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
