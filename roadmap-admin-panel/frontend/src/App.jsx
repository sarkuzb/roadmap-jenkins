import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./compoments/admin/AdminDashboard";
import VideoManagement from "./compoments/admin/VideoManagement";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/videos" element={<VideoManagement />} />

        {/* Default component for root */}
        <Route path="/" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
