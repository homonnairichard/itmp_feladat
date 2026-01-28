import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import List from "./pages/users/List";
import Single from "./pages/users/Single";
import Create from "./pages/users/Create";
import Upd from "./pages/users/Upd";
import Del from "./pages/users/Del";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />

        <Route path="/users" element={<List />} />
        <Route path="/users/new" element={<Create />} />
        <Route path="/users/:id" element={<Single />} />
        <Route path="/users/:id/edit" element={<Upd />} />
        <Route path="/users/:id/delete" element={<Del />} />

        <Route path="*" element={<div className="container py-4">404</div>} />
      </Routes>
    </BrowserRouter>
  );
}
