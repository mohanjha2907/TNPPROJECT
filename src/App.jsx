import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPanelPage from "./pages/AdminPanelPage";
import PublicSharePage from "./pages/PublicSharePage";
import { LoginPage } from "./pages/LoginPage";
import ProtectedRoute from "./Component/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/public" element={<PublicSharePage />} />
        <Route
          path="/AdminPanelPage"
          element={
            <ProtectedRoute>
              <AdminPanelPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
