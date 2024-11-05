import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Problem from "./pages/Problem";
import Stats from "./pages/Stats";
import Account from "./pages/Account";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <div className="h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                isLoggedIn ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="home"
              element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
            />
            <Route
              path="game"
              element={
                isLoggedIn ? <Problem /> : <Navigate to="/login" replace />
              }
            />
            <Route path="login" element={<Login />} />
            <Route
              path="stats"
              element={
                isLoggedIn ? <Stats /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="account"
              element={
                isLoggedIn ? <Account /> : <Navigate to="/login" replace />
              }
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
