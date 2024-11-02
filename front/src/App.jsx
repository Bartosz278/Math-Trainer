import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Problem from "./pages/Problem";
import Stats from "./pages/Stats";
import Account from "./pages/Account";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="game" element={<Problem />} />
          <Route path="login" element={<Login />} />
          <Route path="stats" element={<Stats />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
