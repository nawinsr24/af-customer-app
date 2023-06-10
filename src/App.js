import React from "react";
import './App.css';
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import MissingPage from "./pages/MissingPage";
import RequireAuth from "./components/RequireAuth";
import HomePage from "./pages/HomePage";
import LoadingScreen from "./components/loadingScreen";
import { useAuthContext } from "./context/AuthContext";





function App() {
  const { loading } = useAuthContext();
  return (
    <>
      {loading && <LoadingScreen />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<RequireAuth allowedRoles={['sa']} />}>
          <Route path="/sa" element={<Layout />}>

          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={['staff']} />}>
          <Route path="/bo" element={<Layout />}>


          </Route>
        </Route>


        {/* catch all */}
        <Route path="*" element={<MissingPage />} />
      </Routes>
    </>
  );
}

export default App;