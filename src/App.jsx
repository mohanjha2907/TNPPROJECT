import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPanelPage from "./pages/AdminPanelPage";
import PublicSharePage from "./pages/PublicSharePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminPanelPage />} />
        <Route path="/public" element={<PublicSharePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
